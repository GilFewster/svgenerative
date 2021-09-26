import { SiteHeader } from "../components/site-header";
import styled from "styled-components";
import { PageAreaNames } from "./pageAreaNames";

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
  grid-template-rows: minmax(500px, auto) 1fr;
  grid-template-areas: "${PageAreaNames.Artboard}" "${PageAreaNames.ControlPanel}";
  flex-grow: 1;
  grid-gap: 20px;

  [data-page-area] {
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${Breakpoints.Medium}px) {
    /* padding: 0; */
    grid-template-rows: 3fr minmax(300px, 70%) 4fr;
    grid-template-areas: "." "${PageAreaNames.Artboard}" "${PageAreaNames.ControlPanel}" ".";
  }

  @media (min-width: ${Breakpoints.Large}px) {
    grid-template-columns: 1fr minmax(650px, 800px) minmax(320px, 600px) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". ${PageAreaNames.Artboard} ${PageAreaNames.ControlPanel} .";

    [data-page-area] {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    > [data-page-area=${PageAreaNames.Artboard}] > *:first-child {
      max-height: 600px;
    }
  }
`;

export const DefaultLayout: React.FC = ({ children }) => (
  <Container>
    <SiteHeader />
    <Main>{children}</Main>
  </Container>
);
