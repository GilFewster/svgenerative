import React, { useEffect, useState } from "react";

import { fabric } from "fabric";

import { Button } from "semantic-ui-react";
import { random, spline } from "@georgedoescode/generative-utils/src";

import { useCanvasArtboard } from "../../hooks/use-canvas-artboard";

import { ControlPanel } from "../../components/control-panel";
import { PageArea } from "../../components/page-area";

export const Fabric = () => {
  const { Artboard, getArtboardSize, canvasId } = useCanvasArtboard();
  const [isAnimating, setIsAnimating] = useState(false);
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    if (canvasId && !canvas) setCanvas(new fabric.Canvas(canvasId));
  }, [canvasId, canvas]);

  const clear = () => {
    canvas && canvas.clear();
  };

  const resizeCanvas = () => {
    if (!canvas) return;
    const { width, height } = getArtboardSize();
    canvas.setWidth(width);
    canvas.setHeight(height);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
  });

  const start = () => {
    if (!canvas) return;

    resizeCanvas();
    const squareSize = 20;

    canvas.add(
      new fabric.Rect({
        width: squareSize,
        height: squareSize,
        left: canvas.getWidth() - squareSize,
        top: canvas.getHeight() - squareSize,
        fill: "#339900",
      })
    );
  };

  const stop = () => {};
  const update = () => {};

  return (
    <>
      <PageArea areaName={"artboard"}>{Artboard}</PageArea>
      <PageArea areaName={"controls"}>
        <ControlPanel>
          <Button onClick={() => start()}>Draw</Button>
          <Button onClick={clear}>Clear</Button>
        </ControlPanel>
      </PageArea>
    </>
  );
};
