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
from backend.entities.coworking.initial_form_entity import InitialFormEnity


class GitTogetherService:

    def initial_form(self, formResponses: InitialForm, session: Session):
        entity = InitialFormEnity(
            one=formResponses.one,
            two=formResponses.two,
            three=formResponses.three,
            four=formResponses.four,
            five=formResponses.five,
            pid=formResponses.pid,
        )
        session.add(entity)
        session.commit()

    def class_specific_form(self, formResponse: FormResponse, session: Session):
        entity = SpecificFormEntity(
            value=formResponse.value,
            pid=formResponse.pid,
            contact_information=formResponse.contact_info,
            clas=formResponse.clas,
            first_name=formResponse.first_name,
        )
        session.add(entity)
        session.commit()

    def get_matches(self, clas: str, pid: int, openai: OpenAIService, session: Session):
        # checks to see if user requesting partner has filled out initial form
        if session.query(InitialFormEnity).filter_by(pid=pid).first() == None:
            raise InitialFormError("Fill out initial form first")

        system_prompt = "You are trying to form the best partners for a group programming project. Based on these two answers on a scale of 0-100 how good of partners would they be and why in one sentance."
        # checks to see if user requesting partner has filled out specific form
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
                # ChatGPT call
                result = openai.prompt(
                    system_prompt, user_prompt, response_model=MatchResponse
                )

                if result.compatibility > match.compatibility:
                    iA = session.query(InitialFormEnity).filter_by(pid=r.pid).first()
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

    def delete_student_specifc_answer(self, pid: int, clas: str, session: Session):
        entry = session.query(SpecificFormEntity).filter_by(pid=pid, clas=clas).first()
        if entry:
            session.delete(entry)
            session.commit()

    def delete_class_specifc_answer(self, clas: str, session: Session):
        session.query(SpecificFormEntity).filter_by(clas=clas).delete()
        session.commit()

    # the following aren't really used in the web app, more so just good to have for testing
    def get_initial_form_answers(self, session: Session):
        entries = session.query(InitialFormEnity).all()
        return entries

    def get_specific_form_answers(self, session: Session):
        entries = session.query(SpecificFormEntity).all()
        return entries

    def clear_specific_answers(self, session: Session):
        session.query(SpecificFormEntity).delete()
        session.commit()

    def clearIA(self, session: Session):
        session.query(InitialFormEnity).delete()
        session.commit()
