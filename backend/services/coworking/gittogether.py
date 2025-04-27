from fastapi import Depends
from pytest import Session
from backend.database import db_session
from operator import or_
from typing import Annotated, TypeAlias, List
from fastapi import Depends
from pytest import Session
from backend.entities.coworking.matches_entity import MatchEntity
from backend.entities.coworking.specific_form_entity import SpecificFormEntity
from backend.models.coworking.gittogether import (
    FormResponse,
    GPTResponse,
    InitialForm,
    Match,
    Pairing,
    SpecificFormError,
    InitialFormError,
    MatchResponse,
    StudentAnswer,
)
import json
import re
from backend.services.openai import OpenAIService
from backend.entities.coworking.initial_form_entity import InitialFormEntity
from backend.services import UserService
from ...models import User


class GitTogetherService:

    def __init__(self, connection: Session = Depends(db_session)):
        self._connection = connection

    def initial_form(self, formResponses: InitialForm, session: Session):
        """This adds a new initial form to db"""
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
        """This adds a new specific form to db"""
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

    def get_matches(
        self,
        clas: str,
        pid: int,
        openai: OpenAIService,
        session: Session,
        usersvc: UserService,
    ):
        """gets a user's matches"""
        if session.query(InitialFormEntity).filter_by(pid=pid).first() == None:
            raise InitialFormError("Fill out initial form first")
        # checks to see if user requesting partner has filled out specific form
        if (
            session.query(SpecificFormEntity).filter_by(pid=pid, clas=clas).first()
            == None
        ):
            raise SpecificFormError("Fill out class specifc form first")
        # call get stored matches first
        matches = self.get_stored_matches(pid, clas, session)
        values = self.get_list_of_matches(matches, session, usersvc)
        if values:
            return values
        return "no matches"

    def delete_student_specifc_answer(self, pid: int, clas: str, session: Session):
        """Removes answer from specific form db based on pid and clas"""
        entry = session.query(SpecificFormEntity).filter_by(pid=pid, clas=clas).first()
        if entry:
            session.delete(entry)
            session.commit()
        session.query(MatchEntity).filter(
            or_(MatchEntity.pid_one == pid, MatchEntity.pid_two == pid),
            MatchEntity.course == clas,
        ).delete(synchronize_session=False)
        session.commit()

    def delete_class_specifc_answer(self, clas: str, session: Session):
        """Deletes all specific answers for a class"""
        session.query(SpecificFormEntity).filter_by(clas=clas).delete()
        session.query(MatchEntity).filter_by(clas=clas).delete()
        session.commit()

    def delete_match(self, pid: int, clas: str, pid_two: int, session: Session):
        """Deletes a match based on pids and class"""
        session.query(MatchEntity).filter(
            MatchEntity.pid_one == pid,
            MatchEntity.pid_two == pid_two,
            MatchEntity.course == clas,
        ).delete()
        session.commit()

    def get_student_course_list(self, pid: int, session: Session):
        """Gets all courses a student has filled out the specific form for"""
        entries = session.query(SpecificFormEntity).filter_by(pid=pid)
        results = []
        for r in entries:
            results.append(r.clas)
        return results

    def get_teacher_pairings_list(
        self, clas: str, openai: OpenAIService, session: Session
    ):
        """Gets list of pairings for a teacher for a specific class"""

        entries = session.query(SpecificFormEntity).filter_by(clas=clas)

        results = ""
        for r in entries:
            results += f"{r.pid}: {r.value}; "

        system_prompt = (
            "You are trying to form the best partners for a group programming project. Based on this group of answers, "
            "please pair everyone as best you can, ensuring there is a 1-to-1 unique pairing. Each id is followed by their answer, "
            "separated by a semicolon. "
            'Return the result as JSON in this format: [{"1": "2"}, {"3": "4"}], if there is an odd number of answers make the other pair pid -1.'
        )

        user_prompt = "Here are the answers: " + results

        result = openai.prompt(system_prompt, user_prompt, response_model=GPTResponse)

        match = re.search(r"\[.*\]", result.answer, re.DOTALL)
        if not match:
            raise ValueError("No JSON array found in OpenAI response.")

        raw_pairs = json.loads(match.group(0))
        pairings = {}
        for pair in raw_pairs:
            for k, v in pair.items():
                pairings[int(k)] = int(v)

        return pairings

    def get_stored_matches(self, pid: int, clas: str, session: Session):
        """Gets stored matches from DB based on pid and class"""
        data = session.query(MatchEntity).filter_by(pid_one=pid, course=clas)
        values = []
        for d in data:
            values.append(
                Pairing(
                    pidOne=d.pid_one,
                    pidTwo=d.pid_two,
                    clas=d.course,
                    compatibility=d.compatibility,
                    reasoning=d.reasoning,
                )
            )
        return values

    def get_list_of_matches(
        self, data: list[Pairing], session: Session, usersvc: UserService
    ):
        """Gets all specific form answers for a list of Pairings"""
        values = []
        for d in data:
            s = (
                session.query(SpecificFormEntity)
                .filter_by(clas=d.clas, pid=d.pidTwo)
                .first()
            )
            iA = session.query(InitialFormEntity).filter_by(pid=d.pidTwo).first()
            initialFormAnswers = iA.to_model()
            try:
                avatar: str = usersvc.get_by_id(s.pid).github_avatar if s else None
            except Exception as e:
                print(f"Error getting user by ID {s.pid}: {e}")
                avatar: str = None
            match = Match(
                name=s.first_name,
                contactInformation=s.contact_information,
                bio=s.value,
                compatibility=d.compatibility,
                reasoning=d.reasoning,
                initialAnswers=initialFormAnswers,
                pfp=avatar,
                pid=s.pid,
            )
            values.append(match)
        return values

    def get_chatGPT_response(
        self,
        clas: str,
        pid: int,
        openai: OpenAIService,
        session: Session,
    ):
        """Gets best possible match and then adds to matches entity"""
        userAnswer = (
            session.query(SpecificFormEntity).filter_by(clas=clas, pid=pid).first()
        )
        match = Match()
        match_pid = -1
        system_prompt = "You are trying to form the best partners for a group programming project. Based on these two answers on a scale of 0-100 how good of partners would they be and why in one sentance and less then 128 characters. When giving feedback about the first answer give the feedback as if you are directly talking to the person. Use words like you instead of the first person. "

        temp_previous_matches = session.query(MatchEntity).filter(
            MatchEntity.pid_one == pid
        )
        previous_matches = []
        for t in temp_previous_matches:
            previous_matches.append(t.pid_two)
        print(previous_matches)

        results = (
            session.query(SpecificFormEntity)
            .filter(
                SpecificFormEntity.clas == clas,
                SpecificFormEntity.pid != pid,
                ~SpecificFormEntity.pid.in_(previous_matches),
            )
            .all()
        )
        if results:
            for r in results:
                user_prompt = (
                    "Here are the two answers: " + userAnswer.value + " and: " + r.value
                )
                # ChatGPT call
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
                        pid=r.pid,
                    )
                    match_pid = r.pid
            # add match to saved matches
            entity = MatchEntity(
                pid_one=pid,
                pid_two=match_pid,
                course=clas,
                compatibility=match.compatibility,
                reasoning=match.reasoning,
            )

            session.add(entity)
            session.commit()
        if match.bio != "":
            return match
        return "no matches around"

    # the following aren't really used in the web app, more so just good to have for testing
    def get_initial_form_answers(self, session: Session):
        entries = session.query(InitialFormEntity).all()
        return entries

    def get_specific_form_answers(self, session: Session):
        entries = session.query(SpecificFormEntity).all()
        return entries

    def clear_specific_answers(self, session: Session):
        session.query(SpecificFormEntity).delete()
        session.commit()

    def clearIA(self, session: Session):
        session.query(InitialFormEntity).delete()
        session.commit()
