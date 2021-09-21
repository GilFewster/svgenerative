import { SiteHeader } from "../components/site-header";

export const DefaultLayout = ({ children }) => (
  <>
    <SiteHeader />
    <main>{children}</main>
  </>
);
