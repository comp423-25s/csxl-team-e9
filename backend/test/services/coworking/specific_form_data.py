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
    contact_info="mason@unc.edu",
    clas="COMP110",
    first_name="Mason",
)
rhonda = FormResponse(
    value="I would like a partner that enjoys playing sports. I don't plan to spend a ton of time of this project as I am very involved on campus.",
    pid=999999999,
    contact_info="rhonda@unc.edu",
    clas="COMP110",
    first_name="Rhonda",
)

riley = FormResponse(
    value="I'm pretty chill and usually do my part last-minute. I like working with people who are flexible and not too intense.",
    pid=18,
    contact_info="riley@unc.edu",
    clas="COMP110",
    first_name="Riley",
)

wyatt = FormResponse(
    value="I’m aiming for an A and prefer working with people who are organized and responsive. I don’t mind doing a bit more if needed.",
    pid=27,
    contact_info="wyatt@unc.edu",
    clas="COMP110",
    first_name="wyatt",
)

kris = FormResponse(
    value="I love coding and want to use this class to actually learn something. I’d prefer a partner who’s motivated and communicative.",
    pid=36,
    contact_info="kris@unc.edu",
    clas="COMP110",
    first_name="Kris",
)

luke = FormResponse(
    value="My schedule is packed, but I always make deadlines. I'm okay with splitting tasks and checking in once or twice a week.",
    pid=45,
    contact_info="luke@unc.edu",
    clas="COMP110",
    first_name="Luke",
)


users = [rhonda, mason, riley, kris, luke, wyatt]


def insert_fake_data(session: Session):
    global users
    entities = []
    for user in users:
        entity = SpecificFormEntity.from_model(user)
        session.add(entity)
        entities.append(entity)
    session.commit()


@pytest.fixture(autouse=True)
def fake_data_fixture(session: Session):
    insert_fake_data(session)
    session.commit()
    yield
