import React from "react";
import { Svg, SVG } from "@svgdotjs/svg.js";
import { Artboard as GeneralArtboard } from "../components/artboard";

const type = "svg";

const Artboard = React.forwardRef((props, ref: React.Ref<SVGSVGElement>) => {
  return (
    <GeneralArtboard type={type} {...props}>
      <svg ref={ref} className={type} />
    </GeneralArtboard>
  );
});

export const useSVGArtboard = () => {
  const svgInstance = SVG(`.${type}`) as Svg;

  const getSvgSize = (el: SVGSVGElement | null) => {
    const width = el ? el.width.baseVal.value : 0;
    const height = el ? el.height.baseVal.value : 0;
    return { width, height };
  };
  return { Artboard, svgInstance, getSvgSize };
};
