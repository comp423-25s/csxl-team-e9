from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, TypeAlias
from backend.services.coworking.gittogether import GitTogetherService
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    Match,
    InitialFormAnswer,
    SpecificFormError,
    InitialFormError,
)


__authors__ = ["Mason"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

from ...models.coworking import FormResponse, Match, InitialForm

GitTogetherServiceDI: TypeAlias = Annotated[GitTogetherService, Depends()]


api = APIRouter(prefix="/api/coworking/gittogether")
openapi_tags = {
    "name": "Coworking",
    "description": "Coworking reservations, status, and XL Ambassador functionality.",
}


@api.post("/", tags=["Coworking"])
def initial_form(formResponses: InitialForm, service: GitTogetherServiceDI):
    return service.initial_form(formResponses=formResponses)


@api.post("/specific", tags=["Coworking"])
def class_specific_form(formResponse: FormResponse, service: GitTogetherServiceDI):
    return service.class_specific_form(formResponse=formResponse)


@api.get("/matches", tags=["Coworking"])
def get_matches(clas: str, pid: int, service: GitTogetherServiceDI):
    try:
        return service.get_matches(clas=clas, pid=pid)
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
def get_answers(service: GitTogetherServiceDI):
    return service.get_initial_form_answers()


@api.get("/specificanswers", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI):
    return service.get_specific_form_answers()


@api.delete("/dIA", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI):
    service.clearIA()


@api.delete("/dSA", tags=["Coworking"])
def get_answers(service: GitTogetherServiceDI):
    service.clearSA()
