from typing import Annotated, TypeAlias
from fastapi import Depends
from pytest import Session
from backend.entities.coworking.specific_form_entity import SpecificFormEntity
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    Match,
    SpecificFormError,
    InitialFormError,
    MatchResponse,
)

from backend.services.openai import OpenAIService
from backend.entities.coworking.initial_form_entity import InitialFormEntity


class GitTogetherService:

    def initial_form(self, formResponses: InitialForm, session: Session):
        entity = InitialFormEntity(
            one=formResponses.one,
            two=formResponses.two,
            three=formResponses.three,
            four=formResponses.four,
            five=formResponses.five,
            pid=formResponses.pid,
        )
        existing = (
            session.query(InitialFormEntity).filter_by(pid=formResponses.pid).first()
        )
        if existing == None:
            session.add(entity)
        else:
            existing.update(formResponses)
        session.commit()

    def class_specific_form(self, formResponse: FormResponse, session: Session):
        entity = SpecificFormEntity(
            value=formResponse.value,
            pid=formResponse.pid,
            contact_information=formResponse.contact_info,
            clas=formResponse.clas,
            first_name=formResponse.first_name,
        )
        existing = (
            session.query(SpecificFormEntity)
            .filter_by(pid=formResponse.pid, clas=formResponse.clas)
            .first()
        )
        if existing == None:
            session.add(entity)
        else:
            existing.update(formResponse)
        session.commit()

    def get_matches(self, clas: str, pid: int, openai: OpenAIService, session: Session):
        if session.query(InitialFormEntity).filter_by(pid=pid).first() == None:
            raise InitialFormError("Fill out initial form first")

        system_prompt = "You are trying to form the best partners for a group programming project. Based on these two answers on a scale of 0-100 how good of partners would they be and why in one sentance. When giving feedback about the first answer give the feedback as if you are directly talking to the person. Use words like you instead of the first person. "
        if (
            session.query(SpecificFormEntity).filter_by(pid=pid, clas=clas).first()
            == None
        ):
            raise SpecificFormError("Fill out class specifc form first")

        match = Match()
        results = session.query(SpecificFormEntity).filter_by(clas=clas).all()
        user_answer = (
            session.query(SpecificFormEntity).filter_by(clas=clas, pid=pid).first()
        )
        for r in results:
            if r.pid != pid:
                user_prompt = (
                    "Here are the two answers: "
                    + user_answer.value
                    + " and: "
                    + r.value
                )
                result = openai.prompt(
                    system_prompt, user_prompt, response_model=MatchResponse
                )

                if result.compatibility > match.compatibility:
                    iA = session.query(InitialFormEntity).filter_by(pid=r.pid).first()
                    initialFormAnswers = iA.to_model()
                    match = Match(
                        name=r.first_name,
                        contactInformation=r.contact_information,
                        bio=r.value,
                        compatibility=result.compatibility,
                        reasoning=result.reasoning,
                        initialAnswers=initialFormAnswers,
                    )
        if match.bio != "":
            return match
        return "no matches"

    def get_course_answers(self, session: Session):
        results = session.query(SpecificFormEntity).all()
        if results == None:
            raise SpecificFormError("Fill out class specifc form first")
        return results

    def delete_course_answer(self, clas: str, session: Session):
        entry = session.query(SpecificFormEntity).filter_by(clas=clas).first()
        if entry:
            session.delete(entry)
            session.commit()
