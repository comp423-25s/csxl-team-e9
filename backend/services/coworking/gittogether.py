from backend.models.coworking.gittogether import FormResponse, InitialForm, Match

initialFormAnswers = {}

classSpecficFormAnswers = {}


class GitTogetherService:

    def initial_form(self, formResponses: InitialForm):
        initialFormAnswers[formResponses.pid] = formResponses.pid
        return initialFormAnswers[formResponses.pid]

    def class_specific_form(self, formResponse: FormResponse):
        print(formResponse)

    def get_matches(self, match: Match):
        print(match.contactInformation)
