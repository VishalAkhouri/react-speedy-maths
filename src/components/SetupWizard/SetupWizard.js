import styled from "styled-components";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// styled components
// ===================
const SetupWapper = styled.section`
  padding: 1em;
  background-color: lightblue;
  min-height: 100vh;
`;

const SetupList = styled.ul`
  display: flex;
  justify-content: center;
`;

const SetupListItem = styled.li`
  list-style: none;
`;

// functional component
// ========================
const SetupWizard = props => {
  const [levelInput, setLevelInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();

  const handleClick = event => {
    event.preventDefault();

    dispatch({ type: "RESET_ANSWERED" });
    history.push({
      pathname: "/questions",
      query: `?type=${typeInput}`,
      state: { type: typeInput }
    });
  };

  return (
    <SetupWapper>
      <div>
        <section>
          <header>Choose level</header>
          <div>
            <SetupList>
              <SetupListItem>
                <input
                  type="radio"
                  id="levelone"
                  name="level"
                  value="easy"
                  onClick={event => setLevelInput(event.target.value)}
                />
                Easy
              </SetupListItem>
              <SetupListItem>
                <input
                  type="radio"
                  id="leveltwo"
                  name="level"
                  value="difficult"
                  onClick={event => setLevelInput(event.target.value)}
                />
                Difficult
              </SetupListItem>
            </SetupList>
          </div>
        </section>

        <section>
          <header>Choose type</header>
          <div>
            <SetupList>
              <SetupListItem>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="add"
                  onClick={event => setTypeInput(event.target.value)}
                />
                Addition
              </SetupListItem>
              <SetupListItem>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="subtract"
                  onClick={event => setTypeInput(event.target.value)}
                />
                Subtraction
              </SetupListItem>
              <SetupListItem>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="multiply"
                  onClick={event => setTypeInput(event.target.value)}
                />
                Multiplication
              </SetupListItem>
              <SetupListItem>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="divide"
                  onClick={event => setTypeInput(event.target.value)}
                />
                Division
              </SetupListItem>
              <SetupListItem>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="mixed"
                  onClick={event => setTypeInput(event.target.value)}
                />
                Mixed Questions
              </SetupListItem>
            </SetupList>
          </div>
        </section>
        <section>
          <button onClick={handleClick}>Start test</button>
        </section>
      </div>
    </SetupWapper>
  );
};

export default SetupWizard;
