# Git Together

## Backend

The backend of Git together features a bunch of new API routes.

- /gittogether/ : brings the user to the initial form for baseline answers
- /gittogether/specific :brings the user to the class specific form where they input specific answers for what they want to accomplish and some of their hobbies etc.

- /gittogether/matches : this route gets the users matches for a specific class
- /gittogether/del{pid}/{clas} : this route deletes a specifc answer based on class and user pid
- /gittogether/teacher/coursepairings : this route gets an entire class pairings for a teacher based on a class
- /gittogether/teacher/del/coursepairings: this route deletes all specifc entries for a given class

The Backend also relies on new models including InitialFormAnswer, SpecifcFormAnswer, Match, and Pairing. InitialFormAnswer and SpecificFormAnswer store information for the different forms that are filled out. Match stores information about a students match for a given class, and Pairing contains the two pids of a given pairing for a class.

## AI Integration

The AI integration that takes place in Git Together is when pairing is required. If a student requests a match a request is sent to OpenAI's API that asks the AI to find the student's best match based off of the given answers and to return a compatibility score and a one sentance reason as to why the students would be a good fit together. Something similar occurs for the teacher request as well except the model just returns the list of paired PIDs for all the students who have filled out the form for their class, rather then just one match with all the reasoning.

## Database

The database for Git Together required two new entities to store the answers for initial form answers and specific form answers. Whenever a match is requested these entities are accessed and the needed information is sent to the correct place. In the future we will store matches, to lower requests to OpenAI.
