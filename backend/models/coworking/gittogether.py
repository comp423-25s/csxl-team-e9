from datetime import datetime
from pydantic import BaseModel
from backend.models.user import User


class InitialForm(BaseModel):
    one: int
    two: int
    three: int
    four: int
    five: int
    pid: int


class InitialFormAnswer(BaseModel):
    one: int
    two: int
    three: int
    four: int
    five: int


class FormResponse(BaseModel):
    value: str
    pid: int
    contact_info: str
    clas: str
    first_name: str


class Match(BaseModel):
    name: str
    contactInformation: str
    bio: str
    # initialAnswers: InitialFormAnswer, coming need to fix this end to end tho


class InitialFormError(Exception):
    pass


class SpecificFormError(Exception):
    pass
