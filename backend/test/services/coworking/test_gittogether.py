from typing import Annotated, TypeAlias
from unittest.mock import MagicMock, create_autospec
from fastapi import Depends
import pytest
from sqlalchemy.orm import Session
from backend.database import db_session
from backend.entities.coworking.initial_form_entity import InitialFormEntity
from backend.entities.coworking.specific_form_entity import SpecificFormEntity
from backend.entities.coworking.teacher_matches_entity import TeacherMatchEntity
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    SpecificFormError,
    InitialFormError,
    Match,
    TeacherPairing,
    GPTResponse,
)
from backend.services.coworking.gittogether import GitTogetherService
from backend.services.openai import OpenAIService
from backend.services import UserService
from ..fixtures import gt_svc

SessionDI: TypeAlias = Annotated[Session, Depends(db_session)]

def test_initial_form(gt_svc: GitTogetherService, session: SessionDI):
    """Test that initial form submission works correctly."""
    form = InitialForm(
        pid=1, 
        one=1,  # Changed to integer
        two=2, 
        three=3, 
        four=4, 
        five=5
    )
    gt_svc.initial_form(form, session)
    
    # Check the form was saved
    entity = session.query(InitialFormEntity).filter_by(pid=1).first()
    assert entity is not None
    assert entity.one == 1
    assert entity.five == 5

def test_initial_form(gt_svc: GitTogetherService, session: SessionDI):
    """Test that initial form submission works correctly."""
    form = InitialForm(
        pid=1, one=1, two=2, three=3, four=4, five=5  # Changed to integer
    )
    gt_svc.initial_form(form, session)

    # Check the form was saved
    entity = session.query(InitialFormEntity).filter_by(pid=1).first()
    assert entity is not None
    assert entity.one == 1
    assert entity.five == 5


def test_specific_form(gt_svc: GitTogetherService, session: SessionDI):
    """Test that specific form submission works correctly."""
    form = FormResponse(
        value="Hello",
        pid=1,
        contact_info="test@email.com",
        clas="COMP110",
        first_name="Test",
    )
    gt_svc.class_specific_form(form, session)
    # Check the form was saved
    entity = session.query(SpecificFormEntity).filter_by(pid=1, clas="COMP110").first()
    assert entity is not None
    assert entity.value == "Hello"
    assert entity.contact_information == "test@email.com"


def test_get_matches_without_initial_form(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test that trying to get matches without initial form raises error."""
    mock_openai = create_autospec(OpenAIService)
    mock_usersvc = create_autospec(UserService)

    with pytest.raises(InitialFormError, match="Fill out initial form first"):
        gt_svc.get_matches("COMP110", 1, session, mock_usersvc)


def test_get_matches_without_specific_form(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test that trying to get matches without specific form raises error."""
    mock_openai = create_autospec(OpenAIService)
    mock_usersvc = create_autospec(UserService)

    # Submit initial form but not specific form
    gt_svc.initial_form(InitialForm(pid=1), session)

    with pytest.raises(SpecificFormError, match="Fill out class specifc form first"):
        gt_svc.get_matches("COMP110", 1, session, mock_usersvc)


def test_get_matches_no_matches_found(gt_svc: GitTogetherService, session: SessionDI):
    """Test getting matches when no matches exist."""
    mock_openai = create_autospec(OpenAIService)
    mock_usersvc = create_autospec(UserService)
    
    # Setup test data
    gt_svc.initial_form(InitialForm(pid=1), session)
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", 
            pid=1, 
            contact_info="none", 
            clas="COMP110", 
            first_name="Test"
        ),
        session
    )
    
    # No other users in the system, should return "no matches"
    result = gt_svc.get_matches("COMP110", 1, mock_openai, session, mock_usersvc)
    assert result == "no matches"

def test_get_matches_no_matches_found(gt_svc: GitTogetherService, session: SessionDI):
    """Test getting matches when no matches exist."""
    mock_openai = create_autospec(OpenAIService)
    mock_usersvc = create_autospec(UserService)

    # Setup test data
    gt_svc.initial_form(InitialForm(pid=1), session)
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", pid=1, contact_info="none", clas="COMP110", first_name="Test"
        ),
        session
    )

    # No other users in the system, should return "no matches"
    result = gt_svc.get_matches("COMP110", 1, session, mock_usersvc)
    assert result == "no matches"

def test_delete_nonexistent_specific_answer(gt_svc: GitTogetherService, session: SessionDI):
    """Test that deleting a non-existent answer doesn't cause errors."""
    # Try to delete something that doesn't exist
    gt_svc.delete_student_specifc_answer(999, "NONEXISTENT", session)
    
    # No exception should be raised

def test_delete_specific_answer(gt_svc: GitTogetherService, session: SessionDI):
    """Test that deleting a specific answer works correctly."""
    # Add test data
    gt_svc.initial_form(InitialForm(pid=1), session)
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello", pid=1, contact_info="none", clas="COMP110", first_name="Test"
        ),
        session,
    )

    # Verify it exists
    assert (
        session.query(SpecificFormEntity).filter_by(pid=1, clas="COMP110").first()
        is not None
    )

    # Delete it
    gt_svc.delete_student_specifc_answer(1, "COMP110", session)

    # Verify it's gone
    assert (
        session.query(SpecificFormEntity).filter_by(pid=1, clas="COMP110").first()
        is None
    )


def test_delete_nonexistent_specific_answer(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test that deleting a non-existent answer doesn't cause errors."""
    # Try to delete something that doesn't exist
    gt_svc.delete_student_specifc_answer(999, "NONEXISTENT", session)

    # No exception should be raised
def test_get_stored_matches(gt_svc: GitTogetherService, session: SessionDI):
    """Test that stored matches can be retrieved."""
    # Add test match
    gt_svc.initial_form(InitialForm(pid=1), session)
    gt_svc.initial_form(InitialForm(pid=2), session)
    gt_svc.class_specific_form(
        FormResponse(
            value="Hello",
            pid=1,
            contact_info="none",
            clas="COMP110",
            first_name="Test1",
        ),
        session,
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="World",
            pid=2,
            contact_info="none",
            clas="COMP110",
            first_name="Test2",
        ),
        session,
    )

    # Manually add a match (since we're not testing GPT here)
    from backend.entities.coworking.matches_entity import MatchEntity

    session.add(
        MatchEntity(
            pid_one=1,
            pid_two=2,
            course="COMP110",
            compatibility=80,
            reasoning="Test match",
        )
    )
    session.commit()

    # Get matches
    matches = gt_svc.get_stored_matches(1, "COMP110", session)
    assert len(matches) == 1
    assert matches[0].pidOne == 1
    assert matches[0].pidTwo == 2
    assert matches[0].clas == "COMP110"


def test_get_teacher_pairings_list_empty(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test getting teacher pairings when no pairings exist."""
    mock_openai = create_autospec(OpenAIService)

    # No data in the system, should return empty dict
    pairings = gt_svc.get_teacher_pairings_list("COMP110", mock_openai, session)
    assert pairings == {}


def test_get_teacher_pairings_list_with_existing(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test getting teacher pairings when some pairings already exist."""
    mock_openai = create_autospec(OpenAIService)

    # Add some specific forms
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer1",
            pid=1,
            contact_info="test1@email.com",
            clas="COMP110",
            first_name="Student1",

        ),
        session
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer2",
            pid=2,
            contact_info="test2@email.com",
            clas="COMP110",
            first_name="Student2",
        ),
        session
    )
    
    # Manually add a match (since we're not testing GPT here)
    from backend.entities.coworking.matches_entity import MatchEntity
    session.add(MatchEntity(
        pid_one=1,
        pid_two=2,
        course="COMP110",
        compatibility=80,
        reasoning="Test match"
    ))
    session.commit()
    
    # Get matches
    matches = gt_svc.get_stored_matches(1, "COMP110", session)
    assert len(matches) == 1
    assert matches[0].pidOne == 1
    assert matches[0].pidTwo == 2
    assert matches[0].clas == "COMP110"

    # Manually add a teacher pairing
    session.add(TeacherMatchEntity(pid_one=1, pid_two=2, course="COMP110"))
    session.commit()

    # Should return existing pairings without calling OpenAI
    pairings = gt_svc.get_teacher_pairings_list("COMP110", mock_openai, session)
    assert pairings == {1: 2}
    mock_openai.prompt.assert_not_called()


def test_get_teacher_pairings_list_with_existing(gt_svc: GitTogetherService, session: SessionDI):
    """Test getting teacher pairings when some pairings already exist."""
    mock_openai = create_autospec(OpenAIService)
    
    # Add some specific forms
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer1", pid=1, contact_info="test1@email.com", 
            clas="COMP110", first_name="Student1"
        ),
        session
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer2", pid=2, contact_info="test2@email.com", 
            clas="COMP110", first_name="Student2"
        ),
        session
    )
    
    # Manually add a teacher pairing
    session.add(TeacherMatchEntity(
        pid_one=1,
        pid_two=2,
        course="COMP110"
    ))
    session.commit()
    
    # Should return existing pairings without calling OpenAI
    pairings = gt_svc.get_teacher_pairings_list("COMP110", mock_openai, session)
    assert pairings == {1: 2}
    mock_openai.prompt.assert_not_called()

def test_get_teacher_pairings_list_with_new_students(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test getting teacher pairings when new students need to be paired."""
    mock_openai = create_autospec(OpenAIService)
    # Create a proper GPTResponse object
    mock_response = MagicMock()
    mock_response.answer = '[{"1": "2"}]'
    mock_openai.prompt.return_value = mock_response

    # Add some specific forms
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer1",
            pid=1,
            contact_info="test1@email.com",
            clas="COMP110",
            first_name="Student1",
        ),
        session,
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer2",
            pid=2,
            contact_info="test2@email.com",
            clas="COMP110",
            first_name="Student2",
        ),
        session,
    )

    # Should call OpenAI and create new pairings
    pairings = gt_svc.get_teacher_pairings_list("COMP110", mock_openai, session)
    assert pairings == {1: 2}

    # Verify the pairings were saved to the database
    stored = session.query(TeacherMatchEntity).filter_by(course="COMP110").all()
    assert len(stored) == 1
    assert stored[0].pid_one == 1
    assert stored[0].pid_two == 2


def test_get_teacher_pairings_list_odd_number(
    gt_svc: GitTogetherService, session: SessionDI
):
    """Test getting teacher pairings with an odd number of students."""
    mock_openai = create_autospec(OpenAIService)
    # Create a proper mock response
    mock_response = MagicMock()
    mock_response.answer = '[{"1": "2"}, {"3": "-1"}]'
    mock_openai.prompt.return_value = mock_response

    # Add 3 specific forms (odd number)
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer1",
            pid=1,
            contact_info="test1@email.com",
            clas="COMP110",
            first_name="Student1",
        ),
        session,
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer2",
            pid=2,
            contact_info="test2@email.com",
            clas="COMP110",
            first_name="Student2",
        ),
        session,
    )
    gt_svc.class_specific_form(
        FormResponse(
            value="Answer3",
            pid=3,
            contact_info="test3@email.com",
            clas="COMP110",
            first_name="Student3",
        ),
        session,
    )

    pairings = gt_svc.get_teacher_pairings_list("COMP110", mock_openai, session)
    assert pairings == {1: 2, 3: -1}

    # Verify the pairings were saved to the database
    stored = session.query(TeacherMatchEntity).filter_by(course="COMP110").all()
    assert len(stored) == 2
    assert {(s.pid_one, s.pid_two) for s in stored} == {(1, 2), (3, -1)}


def test_get_stored_teacher_pairings(gt_svc: GitTogetherService, session: SessionDI):
    """Test retrieving stored teacher pairings."""
    # Add some teacher pairings
    session.add_all(
        [
            TeacherMatchEntity(pid_one=1, pid_two=2, course="COMP110"),
            TeacherMatchEntity(pid_one=3, pid_two=4, course="COMP110"),
            TeacherMatchEntity(
                pid_one=5, pid_two=-1, course="COMP110"
            ),  # Odd student out
            TeacherMatchEntity(
                pid_one=6, pid_two=7, course="COMP210"
            ),  # Different course
        ]
    )
    session.commit()

    pairings = gt_svc.get_stored_teacher_pairings("COMP110", session)
    assert len(pairings) == 2  # Should only return COMP110 pairings with valid pids
    assert {p.pidOne for p in pairings} == {1, 3}
    assert {p.pidTwo for p in pairings} == {2, 4}


def test_delete_teacher_course_pairings(gt_svc: GitTogetherService, session: SessionDI):
    """Test deleting all teacher pairings for a course."""
    # Add some teacher pairings
    session.add_all(
        [
            TeacherMatchEntity(pid_one=1, pid_two=2, course="COMP110"),
            TeacherMatchEntity(pid_one=3, pid_two=4, course="COMP110"),
            TeacherMatchEntity(pid_one=5, pid_two=6, course="COMP210"),
        ]
    )
    session.commit()

    # Delete COMP110 pairings
    gt_svc.delete_teacher_course_pairings("COMP110", session)

    # Verify only COMP110 pairings were deleted
    remaining = session.query(TeacherMatchEntity).all()
    assert len(remaining) == 1
    assert remaining[0].course == "COMP210"


def test_delete_teacher_match(gt_svc: GitTogetherService, session: SessionDI):
    """Test deleting a specific teacher pairing."""
    # Add some teacher pairings
    session.add_all(
        [
            TeacherMatchEntity(pid_one=1, pid_two=2, course="COMP110"),
            TeacherMatchEntity(pid_one=3, pid_two=4, course="COMP110"),
            TeacherMatchEntity(pid_one=5, pid_two=6, course="COMP110"),
        ]
    )
    session.commit()

    # Delete one specific pairing
    gt_svc.delete_teacher_match(3, "COMP110", 4, session)

    # Verify only that pairing was deleted
    remaining = session.query(TeacherMatchEntity).filter_by(course="COMP110").all()
    assert len(remaining) == 2
    assert {(r.pid_one, r.pid_two) for r in remaining} == {(1, 2), (5, 6)}
