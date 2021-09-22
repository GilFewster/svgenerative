import React from "react";
import { Display } from "./experiments/display";
// import { Spliner } from "./experiments/spliner";
import { DefaultLayout } from "./layouts/default";

export const App = () => {
  return (
    <DefaultLayout>
      <Display />
    </DefaultLayout>
  );
};
