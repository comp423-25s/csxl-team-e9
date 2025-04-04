from pydantic import BaseModel


class InitialForm(BaseModel):
    one: str
    two: str
    three: str
    four: str
    five: str


class FormResponse(BaseModel):
    value: str


class Match(BaseModel):
    name: str
    contactInformation: str
