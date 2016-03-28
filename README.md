# ScoreGauge

A framework for creating tests that provide a (relatively) quick gauge of a user's performance on a standardized test. 

The idea is that it's possible to zero in on a reasonably accurate score range in less time by DYNANAMICALLY generating questions based on the previous answer's result.

The user begins at a neutral Level value which increments or decrements depending on whether they answer the question correctly. A user's current Level determines the difficulty level of the questions and the ending level determines the score range. 

---
Still under construction – Creating interface for Difficulty and Results settings. 

##Level
Begins at a neutral level and increments or decrements by one depending on whether the user answers correctly or incorrectly. This is the main driver of questions and score. 

Default starting level - 5

##Difficulty
Questions should be grouped into various Difficulty levels which should correspond to different Levels. 

Default grouping is into 3 Difficulty buckets - 1, 2, and 3. Difficulty 1 corresponds to Levels <4, Diffuculty 2 to Levels 5-10, and Difficulty 3 to Levels >10. 

testView.js(line 102): 
if (level > 0 && level <= 5) {
                if (filteredList[i].attributes.Difficulty === 1) {
                    var nextNumber = filteredList[i].attributes.Number;
                    break;
                } else i += 1;
            } else if (level > 5 && level <= 10) {
                if (filteredList[i].attributes.Difficulty === 2) {
                    var nextNumber = filteredList[i].attributes.Number;
                    break;
                } else i += 1;
            } else if (level > 10) {
                if (filteredList[i].attributes.Difficulty === 3) {
                    var nextNumber = filteredList[i].attributes.Number;
                    break;
                } else i += 1;
            }


##Results
Multiple score ranges should correspond to the user's ending Level.

Finding an accurate correlation between Level and score range is the most difficult part of designing this test. Ideally you can get your hands on a large data set of questions/answers/scores for each test you're designing for. 

Other data points can be provided based on user's Level, such as schools within the test range and recommended resources. 

##Add Questions
The interface for adding questions can be found by navigating to http://[url]/addquestions. 

Minimum required data points include the question, possible answers, unique identifying number, and difficulty level. 

Upon submission, a new Backbone model instance will be created and added to the collection. 

Model: 
app.questionsModel = Backbone.Model.extend({
    defaults: {
        Question: 'Empty Question',
        AnswerOne: 'Empty AnswerOne',
        AnswerTwo: 'Empty AnswerTwo',
        AnswerThree: 'Empty AnswerThree',
        AnswerFour: 'Empty AnswerFour',
        AnswerFive: 'Empty AnswerFour',
        Number: '',
        Correct: '',
        Difficulty: ''
    }


##Use 
Working prototype - Still under construction. 

http://ScoreGauge.com:8080




