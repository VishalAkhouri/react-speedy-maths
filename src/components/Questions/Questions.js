import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import QuestionSection from "./QuestionSection";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// functional component
// =========================
const Questions = props => {
  const location = useLocation();
  // initial state
  const initialQuestion = {
    index: 0,
    question: {},
    options: [],
    answer: "",
    isLastQuestion: false
  };

  // reducer
  const currentQuestionReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIRST_QUESTION":
        return {
          index: 0,
          question: action.question,
          options: generateOptions(action.question),
          isLastQuestion: false
        };

      case "SET_NEXT_QUESTION":
        return {
          index: state.index + 1,
          question: action.question,
          options: generateOptions(action.question),
          answer: 33,
          isLastQuestion: state.index + 1 >= questions.length - 1
        };

      default:
        return {};
    }
  };

  const generateOptions = question => {
    let answer;

    switch (question.category) {
      case "add":
        answer = question.numbers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

        return populateOptions(answer);

      case "subtract":
        answer = question.numbers.reduce((accumulator, currentValue) => {
          return accumulator - currentValue;
        });

        return populateOptions(answer);

      case "multiply":
        answer = question.numbers.reduce((accumulator, currentValue) => {
          return currentValue * accumulator;
        }, 1);

        return populateOptions(answer);

      case "divide":
        answer = question.numbers.reduce((accumulator, currentValue) => {
          return accumulator / currentValue;
        });

        return populateOptions(answer);

      default:
        return [0, 0, 0, 0];
    }
  };

  function populateOptions(answer) {
    // to get a random index between 0 and 3 for the options array
    const index = Math.floor(Math.random() * (5 - 1));
    const varianceArray = generateUniqueVariance(-2, 10, 4);
    let options = [];
    for (let i = 0; i < 4; i++) {
      if (i === index) {
        options.push(answer);
      } else {
        options.push(answer + varianceArray[i]);
      }
    }

    return options;
  }

  function generateUniqueVariance(min, max, count) {
    let varianceArray = [];

    // to avoid infinte loop (min and max allowed values should provide a wider range for variance array to include number avoid (5,2,4))
    if (max - min <= count) {
      return [];
    }

    while (varianceArray.length < count) {
      const variance = Math.floor(Math.random() * (max - min) + min);

      if (!varianceArray.includes(variance) && variance !== 0) {
        varianceArray.push(variance);
      }
    }

    return varianceArray;
  }

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, dispatch] = useReducer(
    currentQuestionReducer,
    initialQuestion
  );

  const getQuestions = async () => {
    const queryAPIQuery =
      location.state.type !== "mixed" ? `?category=${location.state.type}` : "";
    const result = await axios(
      `http://localhost:3001/questions${queryAPIQuery}`
    );

    setQuestions(result.data);
    dispatch({ type: "SET_FIRST_QUESTION", question: result.data[0] });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getNextQuestion = index => {
    dispatch({ type: "SET_NEXT_QUESTION", question: questions[index] });
  };

  return (
    <QuestionsContainer>
      <QuestionSection
        question={currentQuestion}
        nextQuestion={getNextQuestion}
      ></QuestionSection>
    </QuestionsContainer>
  );
};

export { Questions };
