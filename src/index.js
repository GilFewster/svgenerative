import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { DefaultLayout } from "./layouts/default";
import { Spliner } from "./experiments/spliner";

ReactDOM.render(
  <React.StrictMode>
    <DefaultLayout>
      <Spliner />
    </DefaultLayout>
  </React.StrictMode>,
  document.getElementById("root")
);
