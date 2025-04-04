from fastapi import APIRouter, Depends


__authors__ = ["Mason"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

from ...models.coworking import FormResponse, Match, InitialForm

api = APIRouter(prefix="/api/coworking/gittogether")
openapi_tags = {
    "name": "Coworking",
    "description": "Coworking reservations, status, and XL Ambassador functionality.",
}


@api.post("/", tags=["Coworking"])
def initial_form(formResponses: InitialForm):
    return formResponses.pid


@api.post("/specific", tags=["Coworking"])
def class_specific_form(formResponse: FormResponse):
    print("hello World")


@api.get("/matches", tags=["Coworking"])
def get_matches(match: Match):
    print("hello World")
