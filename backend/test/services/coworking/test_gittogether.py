from typing import Annotated, TypeAlias
from unittest.mock import MagicMock
from fastapi import Depends
import pytest
from sqlalchemy.orm import Session
from backend.database import db_session
from backend.entities.coworking.initial_form_entity import InitialFormEntity
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    SpecificFormError,
)
from backend.services.coworking.gittogether import GitTogetherService
from backend.services.openai import OpenAIService
from ..fixtures import gt_svc

SessionDI: TypeAlias = Annotated[Session, Depends(db_session)]


"""We are going to end with storing matches so writing tests for matches will be different. """


def test_intial_form(gt_svc: GitTogetherService, session: SessionDI):
    gt_svc.initial_form(InitialForm(), session)
    assert gt_svc._connection.query(InitialFormEntity).filter_by(pid=1).first() != None


def test_specifc_form(gt_svc: GitTogetherService, session: SessionDI):
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", pid=1, contact_info="none", clas="COMP110", first_name="M"
        ),
        session,
    )
    assert gt_svc.get_specific_form_answers(gt_svc._connection) != None


def test_get_matches(gt_svc: GitTogetherService, session: SessionDI):
    gt_svc.initial_form(InitialForm(pid=1), session)
    gt_svc.initial_form(InitialForm(pid=2), session)

    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", pid=2, contact_info="none", clas="COMP50", first_name="M"
        ),
        session,
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", pid=1, contact_info="none", clas="COMP50", first_name="M"
        ),
        session,
    )

    assert gt_svc.get_matches("COMP50", 1, session) == "no matches"


# def test_get_GPT(gt_svc: GitTogetherService, session: SessionDI):
#     gt_svc.initial_form(InitialForm(pid=1), session)
#     gt_svc.initial_form(InitialForm(pid=2), session)
#     openai = OpenAIService()

#     gt_svc.class_specific_form(
#         FormResponse(
#             value="Hello", pid=2, contact_info="none", clas="COMP50", first_name="M"
#         ),
#         session,
#     )
#     gt_svc.class_specific_form(
#         FormResponse(
#             value="Hello", pid=1, contact_info="none", clas="COMP50", first_name="M"
#         ),
#         session,
#     )

#     assert gt_svc.get_chatGPT_response("COMP50", 1, openai, session) != "no matches"


def test_delete_answer(gt_svc: GitTogetherService, session: SessionDI):
    gt_svc.delete_student_specifc_answer(1, "COMP50", session)
    gt_svc.initial_form(InitialForm(pid=1), session)
    with pytest.raises(SpecificFormError, match="Fill out class specifc form first"):
        gt_svc.get_matches("COMP50", pid=1, session=session)
