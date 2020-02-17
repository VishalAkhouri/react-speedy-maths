import React from "react";
import styled from "styled-components";

const AboutUsHeader = styled.header`
  padding: 20px;
  font-size: 22px;
`;

const About = () => {
  return (
    <div>
      <AboutUsHeader>About us</AboutUsHeader>
      <div>
        <div>Speedy Maths app in development...</div>
      </div>
    </div>
  );
};

export { About };
