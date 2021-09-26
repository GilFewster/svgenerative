import React from "react";
import styled from "styled-components";

type ControlPanelProps = {
  className?: string;
};

const Container = styled.div``;

export const ControlPanel: React.FC<ControlPanelProps> = ({
  children,
  ...props
}) => <Container {...props}>{children}</Container>;
