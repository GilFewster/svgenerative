import React, { useRef } from "react";
import { Artboard as GeneralArtboard } from "../../components/artboard";
import { useUniversalCounter } from "../universal-counter";
import { useSize } from "../useSize";

const type = "canvas";

export const useCanvasArtboard = () => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const canvasId = type + String(useUniversalCounter().next());
  const artboardSize = useSize(artboardRef);

  const Artboard = (
    <GeneralArtboard type={type} ref={artboardRef}>
      <canvas id={canvasId} />
    </GeneralArtboard>
  );

  return { Artboard, artboardSize, canvasId };
};
