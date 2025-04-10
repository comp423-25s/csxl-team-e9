from datetime import datetime
from pydantic import BaseModel
from backend.models.user import User


class InitialForm(BaseModel):
    one: int = 1
    two: int = 1
    three: int = 1
    four: int = 1
    five: int = 1
    pid: int = 1


class InitialFormAnswer(BaseModel):
    one: int = 1
    two: int = 1
    three: int = 1
    four: int = 1
    five: int = 1


class FormResponse(BaseModel):
    value: str = ""
    pid: int = 0
    contact_info: str = ""
    clas: str = ""
    first_name: str = ""


class Match(BaseModel):
    name: str
    contactInformation: str
    bio: str
    compatibility: int
    reasoning: str
    initialAnswers: InitialFormAnswer


class InitialFormError(Exception):
    pass


class SpecificFormError(Exception):
    pass


class MatchResponse(BaseModel):
    compatibility: int
    reasoning: str
