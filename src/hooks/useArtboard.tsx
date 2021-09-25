import React from "react";
import styled from "styled-components";
import { Svg, SVG } from "@svgdotjs/svg.js";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  svg {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background: white;

    width: 100%;
    height: 100%;

    border: 2px solid #ddd;
  }
`;

const type = "svg";

const Artboard = React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => {
  return (
    <Container data-artboard={type} {...props}>
      <svg ref={ref} className={type} />
    </Container>
  );
});

export const useArtboard = () => {
  const svgInstance = SVG(`.${type}`) as Svg;

  const getSvgSize = (el: SVGSVGElement | null) => {
    const width = el ? el.width.baseVal.value : 0;
    const height = el ? el.height.baseVal.value : 0;
    return { width, height };
  };
  return { Artboard, svgInstance, getSvgSize };
};
