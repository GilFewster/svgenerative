import React, { useEffect, useRef, useState } from "react";
import { Artboard as GeneralArtboard } from "../components/artboard";
import { useUniversalCounter } from "./universal-counter";

const type = "canvas";

export const useCanvasArtboard = () => {
  // const [svg, setSvg] = useState<Svg>(SVG() as Svg);
  const artboardRef = useRef<HTMLDivElement>(null);
  const canvasId = type + String(useUniversalCounter().next());

  useEffect(() => {
    if (!artboardRef) return;
    // console.log("artboard ref", artboardRef.current);
    // setSvg(SVG(`.${type}`) as Svg);
  }, [artboardRef]);

  const Artboard = (
    <GeneralArtboard type={type} ref={artboardRef}>
      <canvas id={canvasId} />
    </GeneralArtboard>
  );

  const getArtboardSize = () => {
    console.log(artboardRef.current);
    return {
      width: artboardRef.current?.offsetWidth || 0,
      height: artboardRef.current?.offsetHeight || 0,
    };
  };

  // const getSvgInstance = () => {
  //   return svg;
  // };

  return { Artboard, getArtboardSize, canvasId };
};
