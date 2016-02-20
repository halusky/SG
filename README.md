# SG

Provides a (relatively) quick way for a user to gauge their score on a standardized test. This can be used to aid the user in their decision making process about if/when to take a test. 

The idea is that it's possible to zero in on a reasonably accurate score range by DYNANAMICALLY generating questions based on the previous answer's result. (This is not a new idea - I believe the old GRE, for example, uses a similar approach.) 

The user begins at a neutral Level value which increments or decrements depending on whether they answer the question correctly. A user's current Level determines the difficulty level of the questions and the ending level determines the score range. 

##Level
Begins at a neutral level and increments or decrements by one depending on whether the user answers correctly or incorrectly. This is the main driver of questions and score. 

##Difficulty
Questions should be grouped into various Difficulty levels which should correspond to different Levels. For example, questions may be grouped into 3 Difficulty buckets - 1, 2, and 3. Difficulty 1 can correspond to Levels <4, Diffuculty 2 to Levels 5-10, and Difficulty 3 to Levels >10. 


##Score
Multiple score ranges should correspond to the user's ending Level.

Finding an accurate correlation between Level and score range is the most difficult part of designing this test. Ideally you can get your hands on a large data set of questions/answers/scores for each test you're designing for. 

##Data model
Each question should contain data points for at least the question, possible answers, unique identifying number, and difficulty. 

E.g. 
app.questionsModel = Backbone.Model.extend({
    defaults: {
        Question: 'Empty Question',
        AnswerOne: 'Empty AnswerOne',
        AnswerTwo: 'Empty AnswerTwo',
        AnswerThree: 'Empty AnswerThree',
        AnswerFour: 'Empty AnswerFour',
        Number: '',
        Correct: '',
        Difficulty: ''
    }








