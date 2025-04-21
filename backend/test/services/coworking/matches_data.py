from pytest import Session
import pytest

from backend.entities.coworking.matches_entity import MatchEntity
from backend.models.coworking.gittogether import Pairing

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

pairing = Pairing(pidOne=0, pidTwo=999999999, clas="COMP110")


pairs = [pairing]


def insert_fake_data(session: Session):
    global pairs
    entities = []
    for pair in pairs:
        entity = MatchEntity.from_model(pair)
        session.add(entity)
        entities.append(entity)
    session.commit()


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
