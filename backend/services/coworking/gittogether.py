from typing import Annotated, TypeAlias
from fastapi import Depends
from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    Match,
    InitialFormAnswer,
    SpecificFormError,
    InitialFormError,
    MatchResponse,
)

from backend.services.openai import OpenAIService


initialFormAnswers = {}

classSpecficFormAnswers = {}


class GitTogetherService:

    def initial_form(self, formResponses: InitialForm):
        i = InitialFormAnswer(
            one=formResponses.one,
            two=formResponses.two,
            three=formResponses.three,
            four=formResponses.four,
            five=formResponses.five,
        )
        initialFormAnswers[formResponses.pid] = i
        return initialFormAnswers[formResponses.pid]

    def class_specific_form(self, formResponse: FormResponse):
        i = FormResponse(
            value=formResponse.value,
            pid=formResponse.pid,
            contact_info=formResponse.contact_info,
            clas=formResponse.clas,
            first_name=formResponse.first_name,
        )
        classSpecficFormAnswers[str(formResponse.pid) + formResponse.clas] = i
        return classSpecficFormAnswers[str(formResponse.pid) + formResponse.clas]

    def get_matches(self, clas: str, pid: int, openai: OpenAIService):
        if pid not in initialFormAnswers:
            raise InitialFormError("Fill out initial form first")
        ans = "no matches"
        system_prompt = "You are trying to form the best partners for a group programming project. Based on these two answers on a scale of 0-100 how good of partners would they be and why in one sentance."
        if str(pid) + clas in classSpecficFormAnswers:
            ans = classSpecficFormAnswers[str(pid) + clas]
        else:
            raise SpecificFormError("Fill out class specific form first")
        iA = InitialFormAnswer(one=1, two=1, three=1, four=1, five=1)
        match = Match(
            name="",
            contactInformation="",
            bio="",
            compatibility=0,
            reasoning="",
            initialAnswers=iA,
        )
        for k in classSpecficFormAnswers:
            # need to add check to ensure potential matches have filled out the initial form
            # potential to call again if want different match?
            if (
                classSpecficFormAnswers[k].clas == clas
                and classSpecficFormAnswers[k].pid != pid
            ):
                user_prompt = (
                    "Here are the two answers: "
                    + classSpecficFormAnswers[str(pid) + clas].value
                    + " and: "
                    + classSpecficFormAnswers[k].value
                )
                result = openai.prompt(
                    system_prompt, user_prompt, response_model=MatchResponse
                )

                if result.compatibility > match.compatibility:
                    match = Match(
                        name=classSpecficFormAnswers[k].first_name,
                        contactInformation=classSpecficFormAnswers[k].contact_info,
                        bio=classSpecficFormAnswers[k].value,
                        compatibility=result.compatibility,
                        reasoning=result.reasoning,
                        initialAnswers=initialFormAnswers[
                            classSpecficFormAnswers[k].pid
                        ],
                    )
        if match.bio != "":
            return match
        return "no matches"

    def get_initial_form_answers(self):
        return initialFormAnswers

    def get_specific_form_answers(self):
        return classSpecficFormAnswers

    def clear_specific_answers(self):
        classSpecficFormAnswers.clear()

    def clearIA(self):
        initialFormAnswers.clear()

    def delete_student_specifc_answer(self, pid: int, clas: str):
        key = str(pid) + clas
        del classSpecficFormAnswers[key]

    def delete_class_specifc_answer(self, clas: str):
        deleted = []
        for k in classSpecficFormAnswers.keys():
            if clas in k:
                deleted.append(k)
        for i in deleted:
            del classSpecficFormAnswers[i]
