import React, { useEffect, useRef, useState } from "react";
import { Svg, SVG } from "@svgdotjs/svg.js";
import { Artboard as GeneralArtboard } from "../../components/artboard";

const type = "svg";

export const useSvgDotJsArtboard = () => {
  const [svg, setSvg] = useState<Svg>(SVG() as Svg);
  const artboardRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!artboardRef) return;
    setSvg(SVG(`.${type}`) as Svg);
  }, [artboardRef]);

  const Artboard = (
    <GeneralArtboard type={type}>
      <svg ref={artboardRef} className={type} />
    </GeneralArtboard>
  );

  const getArtboardSize = () => {
    return {
      width: artboardRef.current?.width.baseVal.value || 0,
      height: artboardRef.current?.height.baseVal.value || 0,
    };
  };

  const getSvgInstance = () => {
    return svg;
  };

  return { Artboard, getSvgInstance, getArtboardSize };
};
