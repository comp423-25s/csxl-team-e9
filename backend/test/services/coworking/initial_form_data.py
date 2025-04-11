"""Mock data for users.

Three users are setup for testing and development purposes:

1. Rhonda Root (root user with all permissions)
2. Amy Ambassador (staff of XL with elevated permissions)
3. Sally Student (standard user without any special permissions)
4. Ina Instructor
5. Uhlissa UTA
6. Stewie Student
"""

import pytest
from sqlalchemy.orm import Session

from backend.entities.coworking.initial_form_entity import InitialFormEntity
from backend.models.coworking.gittogether import InitialForm

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

root = InitialForm(one=1, two=1, three=1, four=1, five=1, pid=123456789)
mason = InitialForm(one=1, two=2, three=3, four=4, five=5, pid=0)
rhonda = InitialForm(one=1, two=2, three=3, four=4, five=5, pid=999999999)


users = [root, rhonda, mason]


def insert_fake_data(session: Session):
    global users
    entities = []
    for user in users:
        entity = InitialFormEntity.from_model(user)
        session.add(entity)
        entities.append(entity)
    session.commit()  # Commit to ensure User IDs in database


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
