from typing import Annotated, TypeAlias
from fastapi import Depends
import pytest
from backend.entities.coworking.initial_form_entity import InitialFormEntity
from backend.models.coworking.gittogether import FormResponse, InitialForm
from backend.services.coworking.gittogether import GitTogetherService
from backend.services.openai import OpenAIService
from ..fixtures import gt_svc

OpenAIServiceDI: TypeAlias = Annotated[OpenAIService, Depends()]

"""We are going to end with storing matches so writing tests for matches will be different. """


def test_intial_form(gt_svc: GitTogetherService):
    gt_svc.initial_form(InitialForm(), gt_svc._connection)
    assert gt_svc._connection.query(InitialFormEntity).filter_by(pid=1).first() != None


def test_specifc_form(gt_svc: GitTogetherService):
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", pid=1, contact_info="none", clas="COMP110", first_name="M"
        ),
        gt_svc._connection,
    )
    assert gt_svc.get_specific_form_answers(gt_svc._connection) != None


# def test_get_matches(gt_svc: GitTogetherService):
#     gt_svc.initial_form(InitialForm(pid=1), gt_svc._connection)
#     gt_svc.class_specific_form(
#         FormResponse(
#             value="Hello", pid=2, contact_info="none", clas="COMP110", first_name="M"
#         ),
#         gt_svc._connection,
#     )
#     gt_svc.class_specific_form(
#         FormResponse(
#             value="Hello", pid=1, contact_info="none", clas="COMP110", first_name="M"
#         ),
#         gt_svc._connection,
#     )
#     assert (
#         gt_svc.get_matches("COMP110", 1, OpenAIServiceDI, gt_svc._connection)
#         != "no matches"
#     )
