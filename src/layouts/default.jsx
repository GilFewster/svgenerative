import { SiteHeader } from "../components/site-header";
import styled from "styled-components";

const Breakpoints = {
  Medium: 800,
  Large: 1000,
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: ${Breakpoints.Medium}px) {
    flex-direction: row;
  }
  align-content: flex-end;
`;

const Main = styled.main`
  display: grid;
  min-height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(300px, auto) 1fr;
  grid-template-areas: "canvas" "controls";
  flex-grow: 1;

  > .canvas,
  > .controls {
    padding: 10px;
  }

  > .canvas {
    grid-area: canvas;
    height: 500px;
    align-self: center;
  }

  > .controls {
    grid-area: controls;
  }

  @media (min-width: ${Breakpoints.Medium}px) {
    grid-template-rows: 3fr minmax(300px, auto) 4fr;
    grid-template-areas: "." "canvas" "controls" ".";
  }

  @media (min-width: ${Breakpoints.Large}px) {
    grid-template-columns: 1fr minmax(650px, 800px) minmax(320px, 600px) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". canvas controls .";

    > .canvas,
    > .controls {
      display: flex;
      align-items: center;
    }
  }
`;

export const DefaultLayout = ({ children }) => (
  <Container>
    <SiteHeader />
    <Main>{children}</Main>
  </Container>
);
