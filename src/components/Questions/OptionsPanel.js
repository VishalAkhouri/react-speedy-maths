import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";

// STYLED COMPONENTS
// =======================
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Option = styled.li`
  border: 1px solid #f4d03f;
  border-radius: 2px;

  list-style: none;
  padding: 10px 0;
  margin: 10px 0;

  transition-property: background-color;
  transition-duration: 1s;

  &:hover {
    background-color: #F7DC6F;
  }

  &.selected {
    background-color: #F1C40F;
    border-left: 4px solid #9a7d0a;

    transition-property: background-color, border-left;
    transition-duration: 1s, 0.5s

    // animation: ${rotate} 2s linear infinite;
  }

  &.correct {
    background-color: #7DCEA0;
    border-left: 4px solid #229954;

    transition-property: background-color, border-left;
    transition-duration: 1s, 0.5s
    transition-delay: 1s;
  }

  &.wrong {
    background-color: #F5B7B1;
    border-left: 4px solid #CB4335;

    transition-property: background-color, border-left;
    transition-duration: 1s, 0.5s;
    // transition-delay: 1s;
  }
`;

const OptionsSectionDiv = styled.div`
  padding: 20px;
`;

// FUNCTIONAL COMPONENT
// =====================
const OptionsPanel = props => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

  const dispatch = useDispatch();

  const handleClick = (selectedOption, selectedIndex) => async event => {
    event.preventDefault();

    setActiveIndex(selectedIndex);
    const correctAnswer = await checkAnswers();
    const correctIndex = props.options.indexOf(parseInt(correctAnswer, 10));

    setCorrectAnswerIndex(correctIndex);
    let answeredCorrectly = selectedIndex === correctIndex ? true : false;

    // save answered questions to redux store
    dispatch({
      type: "SAVE_ANSWERED",
      answer: {
        ...props.question,
        options: props.options,
        correctAnswer,
        selectedOption,
        answeredCorrectly
      }
    });

    navigateToNextQuestion();
  };

  function navigateToNextQuestion() {
    setTimeout(() => {
      resetActiveIndexes();
      props.showNextQuestion();
    }, 1000);
  }

  function resetActiveIndexes() {
    setActiveIndex(-1);
    setCorrectAnswerIndex(-1);
  }

  const getOptionsClass = currentIndex => {
    if (currentIndex === correctAnswerIndex) {
      return "correct";
    } else if (currentIndex === activeIndex) {
      return "wrong";
    }
  };

  const checkAnswers = async _ => {
    const result = await axios.get(
      `http://localhost:3001/answers?id=${props.questionId}`
    );
    return result.data[0].answer;
  };

  return (
    <OptionsSectionDiv>
      <span>Choose from the options:</span>
      <ul>
        {props.options.map((option, index) => {
          return (
            <Option
              key={index}
              onClick={handleClick(option, index)}
              className={getOptionsClass(index)}
            >
              {option}
            </Option>
          );
        })}
      </ul>
    </OptionsSectionDiv>
  );
};
//className={activeIndex === index ? `selected` : null}
export default OptionsPanel;
