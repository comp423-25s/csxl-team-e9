from pytest import Session
import pytest
from backend.entities.coworking.specific_form_entity import SpecificFormEntity
from backend.models.coworking.gittogether import FormResponse

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

mason = FormResponse(
    value="I enjoy playing basketball and would like to get the bare minimum done to pass this class.",
    pid=0,
    contact_info="3368800548",
    clas="COMP110",
    first_name="Mason",
)
rhonda = FormResponse(
    value="I would like a partner that enjoys playing sports. I don't plan to spend a ton of time of this project as I am very involved on campus.",
    pid=999999999,
    contact_info="3360000000",
    clas="COMP110",
    first_name="Rhonda",
)


users = [rhonda, mason]


def insert_fake_data(session: Session):
    global users
    entities = []
    for user in users:
        entity = SpecificFormEntity.from_model(user)
        session.add(entity)
        entities.append(entity)
    session.commit()  # Commit to ensure User IDs in database


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
