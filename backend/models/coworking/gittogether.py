from pydantic import BaseModel


class InitialForm(BaseModel):
    """This holds student answers for basic questions about work preferences"""

    one: int = 1
    two: int = 1
    three: int = 1
    four: int = 1
    five: int = 1
    pid: int = 1


class FormResponse(BaseModel):
    """This holds class specific answers and contact information for a student"""

    value: str = ""
    pid: int = 0
    contact_info: str = ""
    clas: str = ""
    first_name: str = ""


class Match(BaseModel):
    """This holds all the information necessary for a match"""

    name: str = ""
    contactInformation: str = ""
    bio: str = ""
    compatibility: int = 0
    reasoning: str = ""
    initialAnswers: InitialForm = InitialForm()
    pfp: str | None = ""
    pid: int = 0


class InitialFormError(Exception):
    """Raised if a student hasn't filled out the initial form yet"""

    pass


class SpecificFormError(Exception):
    """Raised if there is an error filling out the class specifc form"""

    pass


class MatchResponse(BaseModel):
    """GPT response model for a match"""

    compatibility: int
    reasoning: str


class Pairing(BaseModel):
    """Model used to store match information for persistent storage"""

    pidOne: int
    pidTwo: int
    clas: str
    compatibility: int = 0
    reasoning: str = ""


class TeacherPairing(BaseModel):
    """Model used to store teacher pairings information for persistent storage"""

    pidOne: int
    pidTwo: int
    clas: str


class GPTResponse(BaseModel):
    """GPT response model for teacher pairings"""

    answer: str
