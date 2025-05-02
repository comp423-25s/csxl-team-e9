from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Annotated, TypeAlias
from backend.database import db_session
from backend.services.coworking.gittogether import GitTogetherService
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    SpecificFormError,
    InitialFormError,
)
from backend.services.openai import OpenAIService
from sqlalchemy.orm import Session
from backend.services.role import RoleService
from backend.models.user import User
from backend.services.user import UserService

__authors__ = ["Mason"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

from ...models.coworking import FormResponse, InitialForm

GitTogetherServiceDI: TypeAlias = Annotated[GitTogetherService, Depends()]

OpenAIServiceDI: TypeAlias = Annotated[OpenAIService, Depends()]

SessionDI: TypeAlias = Annotated[Session, Depends(db_session)]

RoleSvc: TypeAlias = Annotated[RoleService, Depends(RoleService)]

UserSvc: TypeAlias = Annotated[UserService, Depends(UserService)]


api = APIRouter(prefix="/api/coworking/gittogether")
openapi_tags = {
    "name": "Coworking",
    "description": "Coworking reservations, status, and XL Ambassador functionality.",
}


@api.post(
    "/",
    tags=["Coworking"],
    summary="""Create initial form answer""",
    description="""Individual fills our the initial form to give baseline answers for partner work""",
)
def initial_form(
    formResponses: Annotated[
        InitialForm,
        Body(
            openapi_examples={
                "Rhonda": {
                    "value": {
                        "one": 1,
                        "two": 2,
                        "three": 3,
                        "four": 4,
                        "five": 5,
                        "pid": 999999999,
                    }
                },
                "Mason": {
                    "value": {
                        "one": 1,
                        "two": 2,
                        "three": 3,
                        "four": 4,
                        "five": 5,
                        "pid": 0,
                    }
                },
            },
        ),
    ],
    service: GitTogetherServiceDI,
    session: SessionDI,
):
    return service.initial_form(formResponses=formResponses, session=session)


@api.post(
    "/specific",
    tags=["Coworking"],
    summary="Create specifc form answer",
    description="Creates a new class specific form answer",
)
def class_specific_form(
    formResponse: Annotated[
        FormResponse,
        Body(
            openapi_examples={
                "Rhonda": {
                    "value": {
                        "value": "I would like a partner that enjoys playing sports. I don't plan to spend a ton of time of this project as I am very involved on campus.",
                        "pid": 999999999,
                        "contact_info": "3368800548",
                        "clas": "COMP110",
                        "first_name": "Rhonda",
                    }
                },
                "Mason": {
                    "value": {
                        "value": "I enjoy playing basketball and would like to get the bare minimum done to pass this class.",
                        "pid": 0,
                        "contact_info": "3368800548",
                        "clas": "COMP110",
                        "first_name": "Mason",
                    }
                },
            }
        ),
    ],
    service: GitTogetherServiceDI,
    session: SessionDI,
):
    return service.class_specific_form(formResponse=formResponse, session=session)


@api.get(
    "/matches",
    tags=["Coworking"],
    summary="Get student matches",
    description="Gets all stored matches for a specified student and class",
)
def get_matches(
    clas: str,
    pid: int,
    service: GitTogetherServiceDI,
    session: SessionDI,
    userService: UserSvc,
):
    try:
        results = service.get_matches(
            clas=clas, pid=pid, session=session, usersvc=userService
        )
        return results
    except InitialFormError:
        raise HTTPException(
            status_code=403,
            detail="Fill out Initial Form First.",
        )
    except SpecificFormError:
        raise HTTPException(
            status_code=403,
            detail="Fill out Specific Form.",
        )


@api.get(
    "/new/matches",
    tags=["Coworking"],
    summary="Get new match",
    description="Creates a new student match using OpenAI that is then stored and returned",
)
def get_new_matches(
    clas: str,
    pid: int,
    service: GitTogetherServiceDI,
    openai: OpenAIServiceDI,
    session: SessionDI,
):
    try:
        return service.get_chatGPT_response(
            clas=clas, pid=pid, openai=openai, session=session
        )
    except InitialFormError:
        raise HTTPException(
            status_code=403,
            detail="Fill out Initial Form First.",
        )
    except SpecificFormError:
        raise HTTPException(
            status_code=403,
            detail="Fill out Specific Form.",
        )


@api.get(
    "/specificanswers",
    tags=["Coworking"],
    summary="Get all class specific answers",
    description="Gets every class specific answers",
)
def get_answers(service: GitTogetherServiceDI, session: SessionDI):
    return service.get_specific_form_answers(session=session)


@api.get("/student/courses", tags=["Coworking"])
def get_student_course_answer(
    service: GitTogetherServiceDI, pid: int, session: SessionDI
):
    return service.get_student_course_list(pid, session=session)


@api.get(
    "/teacher/coursepairings",
    tags=["Coworking"],
    summary="Get teacher course pairings",
    description="Gets stored teacher pairings and if students aren't already paired, adds and stores new pairings using OpenAI",
)
def get_teacher_course_pairings(
    service: GitTogetherServiceDI,
    clas: str,
    openai: OpenAIServiceDI,
    session: SessionDI,
):
    return service.get_teacher_pairings_list(clas=clas, openai=openai, session=session)


@api.delete(
    "/del{pid}/{clas}",
    tags=["Coworking"],
    summary="Delete a class specific answer",
    description="Deletes a class specific answer for a student and all matches associated with it ",
)
def delete_specifc_answer(
    service: GitTogetherServiceDI, pid: int, clas: str, session: SessionDI
):
    service.delete_student_specifc_answer(pid, clas, session=session)


@api.delete(
    "/del/studentmatch",
    tags=["Coworking"],
    summary="Delete student match",
    description="Deletes a match between two specified students",
)
def delete_match(
    service: GitTogetherServiceDI, pid: int, clas: str, pid_two: int, session: SessionDI
):
    service.delete_match(pid, clas, pid_two, session)


@api.delete(
    "/del/teachermatch",
    tags=["Coworking"],
    summary="Delete teacher pairing",
    description="Deletes a pairing between two specified students",
)
def delete_teacher_match(
    service: GitTogetherServiceDI, pid: int, clas: str, pid_two: int, session: SessionDI
):
    service.delete_teacher_match(pid, clas, pid_two, session)


@api.delete(
    "/teacher/del/teacherpairings",
    tags=["Coworking"],
    summary="Delete teacher pairings",
    description="Deletes all pairings between two students for a specified class",
)
def delete_teacher_pairings(
    service: GitTogetherServiceDI, clas: str, session: SessionDI
):
    service.delete_teacher_course_pairings(clas, session=session)


@api.get(
    "/is-ambassador",
    tags=["Coworking"],
    response_model=bool,
    summary="Get is ambassador",
    description="Checks to see if a user is an ambassador or not",
)
def check_if_ambassador(
    id: str,
    roleService: RoleSvc,
    userService: UserSvc,
):
    user: User = userService.get_by_id(id)
    return roleService.is_member(subject=user, id=2, userId=id)
