import React from "react";
import styled from "styled-components";

type ControlPanelProps = {
  className?: string;
};

const Container = styled.section`
  /* display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px auto 0 auto;
  width: 200px; */
`;

export const ControlPanel: React.FC<ControlPanelProps> = ({
  children,
  ...props
}) => <Container {...props}>{children}</Container>;
