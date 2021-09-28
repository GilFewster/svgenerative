import React from "react";
import styled, { css } from "styled-components";
import type { PageAreaNames } from "../../layouts/pageAreaNames";

type PageAreaName = `${PageAreaNames}`;

type PageAreaProps = {
  areaName: PageAreaName;
  className?: string;
};

export const PageArea: React.FC<PageAreaProps> = ({
  areaName,
  children,
  ...props
}) => (
  <section {...props} data-page-area={areaName}>
    {children}
  </section>
);
