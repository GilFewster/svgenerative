import React from "react";
import styled from "styled-components";

type ControlPanelProps = {
  className?: string;
};

const Container = styled.div`
  padding: calc(var(--padding) / 2);
`;

export const ControlPanel: React.FC<ControlPanelProps> = ({
  children,
  ...props
}) => <Container {...props}>{children}</Container>;
