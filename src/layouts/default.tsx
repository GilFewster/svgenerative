import { SiteHeader } from "../components/site-header";
import styled from "styled-components";
import { PageAreaNames } from "./pageAreaNames";

const Breakpoints = {
  MD: 800,
  LG: 1024,
  XL: 1024,
};

const PageContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  --padding: clamp(10px, calc(2.4vw + 1vh), 100px);
  --radius: clamp(5px, 0.5vw, 10px);
  --shadow-size: clamp(3px, 0.75vw, 15px);
  --shadow-filter: drop-shadow(0 0 var(--shadow-size) rgba(0, 0, 0, 0.2));
  --artboard-border: clamp(1px, 0.2vw, 3px) solid #ddd;
  --artboard-bg: white;

  height: 100%;

  padding: var(--padding);
  grid-gap: var(--padding);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(400px, 1fr) auto;
  grid-template-areas: "${PageAreaNames.Artboard}" "${PageAreaNames.ControlPanel}";

  [data-page-area="${PageAreaNames.Artboard}"] {
    grid-area: ${PageAreaNames.Artboard};
  }

  [data-page-area="${PageAreaNames.ControlPanel}"] {
    grid-area: ${PageAreaNames.ControlPanel};
    background: rgba(150, 150, 150, 0.1);
    border-radius: var(--radius);
  }

  [data-artboard] {
    border-radius: var(--radius);
    filter: var(--shadow-filter);
    border: var(--artboard-border);
    background: var(--artboard-bg);
  }

  @media (min-width: ${Breakpoints.XL}px) {
    grid-template-rows: 1fr;
    grid-template-columns: minmax(400px, 1fr) minmax(300px, auto);
    grid-template-areas: "${PageAreaNames.Artboard} ${PageAreaNames.ControlPanel}";

    [data-page-area="${PageAreaNames.ControlPanel}"] {
      grid-area: ${PageAreaNames.ControlPanel};
    }

    > [data-page-area=${PageAreaNames.Artboard}] > *:first-child {
      /* max-height: 600px; */
    }
  }
`;

export const DefaultLayout: React.FC = ({ children }) => (
  <PageContainer>
    <SiteHeader />
    <Main>{children}</Main>
  </PageContainer>
);
