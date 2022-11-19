import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background-color: #1a1a2e;
`;

export const ImageWrapper = styled.div`
  display: flex;
  width: 6rem;
  height: 5rem;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 24rem;
  height: 32rem;

  img {
    margin: 0 auto;
  }

  a {
    background-color: #46467a;
    padding: 0.8rem 1.6rem;
    border-radius: 0.6rem;

    transition: all 0.4s;
  }

  a + a {
    margin-top: 0.8rem;
  }

  a:hover {
    background-color: #7171c7;
    transform: scale(1.05);
  }
`;
