import { SiteHeader } from "../components/site-header";
import styled from "styled-components";

// const Main = styled.main`
//   padding: 30px;
//   background-color: #efefef;
//   height: 100%;
//   display: grid;
//   align-items: center;
//   align-content: center;
// `;

const Main = styled.main`
  display: grid;
  min-height: 100%;
  grid-template-rows: minmax(300px, auto) 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "canvas" "controls";

  > .canvas,
  > .controls {
    padding: 10px;
  }

  > .canvas {
    grid-area: canvas;
    /* background: blue; */
  }

  > .controls {
    grid-area: controls;
    /* background: red; */
  }

  @media (min-width: 1000px) {
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
  <>
    <SiteHeader />
    <Main>{children}</Main>
  </>
);
