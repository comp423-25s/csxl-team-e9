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


class Match(BaseModel):
    name: str
    contactInformation: str


class CollaborationsResponse(BaseModel):
    """Models the available list of collaborations. Returned when retrieving all available collaborations."""

    collaborations: list[str]


class EnteredColabsResponse(BaseModel):
    """Models the available list of entered collaborations. Returned when retreiving all entered collaborations for a user."""

    collaborations: list[str]


class EnteredUsersResponse(BaseModel):
    """Models the list of users who joined a colab. Returned when retreiving list of people who entered a specific collaboration."""

    users: list[User]


class Form(BaseModel):
    """Models information to join a collaboration. Sent when users enter a collaboration."""

    user: User
    expiration: datetime
    collaboration: str


class MatchesResponse(BaseModel):
    """Models the matches for a user within a given collaboration. Returned when retreiving matches for a specific collaboration."""

    matches: dict[str, int]
    collaboration: str


class GtPreferences(BaseModel):
    """Models the preference form. Sent when the user submits their preferences."""

    user: User
    q1: int
    q2: int
    q3: int
    q4: int
    q5: int
    q6: str
    q7: str
    q8: str
    q9: str
    q10: str


class UserInfoResponse(BaseModel):
    """Models user contact information. Returned when a matched user requests connection information."""

    phone: int
    email: str
