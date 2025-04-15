from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Annotated, TypeAlias
from backend.database import db_session
from backend.services.coworking.gittogether import GitTogetherService
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    Match,
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

from ...models.coworking import FormResponse, Match, InitialForm

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


@api.post("/", tags=["Coworking"])
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
            }
        ),
    ],
    service: GitTogetherServiceDI,
    session: SessionDI,
):
    return service.initial_form(formResponses=formResponses, session=session)


@api.post("/specific", tags=["Coworking"])
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


@api.get("/matches", tags=["Coworking"])
def get_matches(
    clas: str,
    pid: int,
    service: GitTogetherServiceDI,
    openai: OpenAIServiceDI,
    session: SessionDI,
):
    try:
        return service.get_matches(clas=clas, pid=pid, openai=openai, session=session)
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


@api.get("/initialanswers", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI, session: SessionDI):
    return service.get_initial_form_answers(session=session)


@api.get("/specificanswers", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI, session: SessionDI):
    return service.get_specific_form_answers(session=session)


@api.get("/student/courses", tags=["Coworking"])
def get_student_course_answer(
    service: GitTogetherServiceDI, pid: int, session: SessionDI
):
    return service.get_student_course_list(pid, session=session)


@api.get("/teacher/coursepairings", tags=["Coworking"])
def get_teacher_course_pairings(
    service: GitTogetherServiceDI,
    clas: str,
    openai: OpenAIServiceDI,
    session: SessionDI,
):
    return service.get_teacher_pairings_list(clas=clas, openai=openai, session=session)


@api.delete("/del{pid}/{clas}", tags=["Coworking"])
def delete_specifc_answer(
    service: GitTogetherServiceDI, pid: str, clas: str, session: SessionDI
):
    service.delete_student_specifc_answer(pid, clas, session=session)


@api.delete("/del{clas}", tags=["Coworking"])
def delete_specifc_class(service: GitTogetherServiceDI, clas: str, session: SessionDI):
    service.delete_class_specifc_answer(clas, session=session)


@api.delete("/dIA", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI, session: SessionDI):
    service.clearIA(session=session)


@api.delete("/dSA", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI, session: SessionDI):
    service.clear_specific_answers(session=session)


@api.get("/is-ambassador", tags=["Coworking"], response_model=bool)
def check_if_ambassador(
    id: str,
    roleService: RoleSvc,
    userService: UserSvc,
):
    user: User = userService.get_by_id(id)
    return roleService.is_member(subject=user, id=2, userId=id)
