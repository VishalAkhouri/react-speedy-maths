import React from "react";
import styled from "styled-components";
import OptionsPanel from "./OptionsPanel";
import { useHistory } from "react-router-dom";

const QuestionSectionDiv = styled.div`
  width: 400px;
  padding: 12px;

  border-radius: 3px;
  margin: 10px;

  background-color: #fcf3cf;
  border: 1px solid #f9e79f;
`;

const QuestionHeader = styled.header`
  align-self: flex-end;
`;

const QuestionHeaderQuestionNumber = styled.span`
  font-size: 30px;
`;

const QuestionHeaderQuestion = styled.span`
  padding-left: 20px;
  font-size: 22px;
`;

const createQuestionStatement = (numbers, symbol) => {
  let result = numbers;
  if (numbers) {
    result = numbers.join(symbol);
  }
  return <span>{result}</span>;
};

const QuestionSection = props => {
  const history = useHistory();
  const handleNextClick = event => {
    event.preventDefault();
    showNextQuestion();
  };

  const showNextQuestion = () => {
    if (!props.question.isLastQuestion) {
      props.nextQuestion(props.question.index + 1);
    } else {
      history.push("/results");
    }
  };

  return (
    <QuestionSectionDiv>
      <QuestionHeader>
        <QuestionHeaderQuestionNumber>
          Q {props.question.index}:
        </QuestionHeaderQuestionNumber>
        <QuestionHeaderQuestion>
          {createQuestionStatement(
            props.question.question.numbers,
            props.question.question.symbol
          )}
        </QuestionHeaderQuestion>
      </QuestionHeader>

      <OptionsPanel
        question={props.question.question}
        questionId={props.question.question.id}
        options={props.question.options}
        showNextQuestion={showNextQuestion}
      ></OptionsPanel>

      {/* <div>
        {props.question.isLastQuestion ? (
          <button>Result</button>
        ) : (
          <button onClick={handleNextClick}>Skip question</button>
        )}
      </div> */}
    </QuestionSectionDiv>
  );
};

export default QuestionSection;
