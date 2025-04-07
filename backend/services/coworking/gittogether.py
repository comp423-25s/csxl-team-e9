from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    Match,
    InitialFormAnswer,
    SpecificFormError,
    InitialFormError,
)

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

    def get_matches(self, clas: str, pid: int):
        if pid not in initialFormAnswers:
            raise InitialFormError("Fill out initial form first")
        ans = "no matches"
        if str(pid) + clas in classSpecficFormAnswers:
            ans = classSpecficFormAnswers[str(pid) + clas]
        else:
            raise SpecificFormError("Fill out class specific form first")
        for k in classSpecficFormAnswers:
            if (
                classSpecficFormAnswers[k].clas == clas
                and classSpecficFormAnswers[k].pid != pid
            ):
                # run chatGPT method to see if match is compatible
                # if so return, else, run it again
                return Match(
                    name=classSpecficFormAnswers[k].first_name,
                    contactInformation=classSpecficFormAnswers[k].contact_info,
                    bio=classSpecficFormAnswers[k].value,
                )
        return "no matches"

    def get_initial_form_answers(self):
        return initialFormAnswers


    def get_specific_form_answers(self):
        return classSpecficFormAnswers

    def clearSA(self):
        classSpecficFormAnswers.clear()

    def clearIA(self):
        initialFormAnswers.clear()
