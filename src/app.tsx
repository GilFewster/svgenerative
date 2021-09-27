import React from "react";
import { Spliner } from "./experiments/spliner";
import { Fabric } from "./experiments/fabric";
import { DefaultLayout } from "./layouts/default";

export const App = () => {
  return (
    <DefaultLayout>
      <Fabric />
    </DefaultLayout>
  );
};
