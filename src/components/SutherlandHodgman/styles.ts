import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

  background-color: #1a1a2e;

  canvas {
    border: 1px solid #e2e2e2;
  }
`;

export const Column = styled.section`
  width: 50vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
