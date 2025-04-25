from pytest import Session
import pytest

from backend.entities.coworking.teacher_matches_entity import TeacherMatchEntity
from backend.models.coworking.gittogether import TeacherPairing

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

pairing = TeacherPairing(pidOne=750, pidTwo=751, clas="COMP50")

pairing2 = TeacherPairing(pidOne=755, pidTwo=754, clas="COMP50")

pairing3 = TeacherPairing(pidOne=752, pidTwo=753, clas="COMP50")


pairs = [pairing, pairing2, pairing3]


def insert_fake_data(session: Session):
    global pairs
    entities = []
    for pair in pairs:
        entity = TeacherMatchEntity.from_model(pair)
        session.add(entity)
        entities.append(entity)
    session.commit()


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
