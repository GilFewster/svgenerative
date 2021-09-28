import React from "react";
import { Spliner } from "./experiments/spliner";
import { DefaultLayout } from "./layouts/default";

export const App = () => {
  return (
    <DefaultLayout>
      <Spliner />
    </DefaultLayout>
  );
};
