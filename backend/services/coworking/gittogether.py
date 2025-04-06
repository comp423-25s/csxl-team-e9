from backend.models.coworking.gittogether import (
    FormResponse,
    InitialForm,
    Match,
    InitialFormAnswer,
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
        print(formResponse)

    def get_matches(self, match: Match):
        print(match.contactInformation)
