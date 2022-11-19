import Link from "next/link";
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
`;

export const Author = styled(Link)`
  padding: 0;
  background-color: transparent;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }
`;
