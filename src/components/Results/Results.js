import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ResultsHeader = styled.header`
  padding: 20px;
  font-size: 22px;
`;

const Results = props => {
  const answers = useSelector(state => state.answers.answers);

  const correctAnswers = () => {
    const correct = answers.filter(answer => answer.answeredCorrectly);
    return correct;
  };

  return (
    <div>
      <ResultsHeader>The results are out:</ResultsHeader>

      <div>
        <div>
          <span>Total questions: </span>
          <span>{answers.length}</span>
        </div>

        <div>
          <span>Your score: </span>
          <span>{correctAnswers().length}</span>
        </div>
      </div>
    </div>
  );
};

export default Results;
