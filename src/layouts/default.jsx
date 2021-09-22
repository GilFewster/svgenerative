import { SiteHeader } from "../components/site-header";
import styled from "styled-components";

const Main = styled.main`
  padding: 30px;
  background-color: #efefef;
  height: 100%;
  display: grid;
  align-items: center;
  align-content: center;
`;

export const DefaultLayout = ({ children }) => (
  <>
    <SiteHeader />
    <Main>{children}</Main>
  </>
);
