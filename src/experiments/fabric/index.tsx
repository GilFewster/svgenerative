import React, { useEffect, useState } from "react";

import { fabric } from "fabric";

import { Button } from "semantic-ui-react";
import { useCanvasArtboard } from "../../hooks/artboards";

import { ControlPanel } from "../../components/control-panel";
import { PageArea } from "../../components/page-area";

export const Fabric = () => {
  const { Artboard, artboardSize, canvasId } = useCanvasArtboard();
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    if (canvasId && !canvas) setCanvas(new fabric.Canvas(canvasId));
  }, [canvasId, canvas]);

  const clear = () => {
    canvas && canvas.clear();
  };

  // useEffect(() => {
  //   if (!canvas || !artboardSize) return;
  //   canvas.setWidth(artboardSize.width);
  //   canvas.setHeight(artboardSize.height);
  // }, [artboardSize, canvas]);

  const start = () => {
    if (!canvas) return;

    const squareSize = 20;

    canvas.add(
      new fabric.Rect({
        width: squareSize,
        height: squareSize,
        left: artboardSize.width - squareSize,
        top: artboardSize.height - squareSize,
        fill: "#339900",
      })
    );
  };

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
