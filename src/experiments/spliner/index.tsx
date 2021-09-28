import React, { useEffect, useRef, useState } from "react";

import { fabric } from "fabric";

import { Button } from "semantic-ui-react";
import { useCanvasArtboard } from "../../hooks/artboards";

import { ControlPanel } from "../../components/control-panel";
import { PageArea } from "../../components/page-area";
import {
  IncrementingFunction,
  useIncrementingLooper,
} from "../../hooks/loopers";

import { random, spline } from "@georgedoescode/generative-utils/src";

export const Spliner = () => {
  const { Artboard, artboardSize, canvasId } = useCanvasArtboard();
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  const [numSteps] = useState(8);
  const [yVariance] = useState(15);
  const [isAnimating, setIsAnimating] = useState(false);

  const alphaIncrementor: IncrementingFunction = (current) =>
    Math.round((current - 0.05) * 100) / 100;

  const colorIncrementor: IncrementingFunction = (current: number) =>
    current + 10;

  const points: IPoint2D[] = [];
  const requestRef = useRef<number>();
  const lineAlpha = useIncrementingLooper({
    startValue: 1,
    minValue: 0,
    incrementor: alphaIncrementor,
  });
  const lineColors = useIncrementingLooper({
    startValue: 0,
    maxValue: 180,
    incrementor: colorIncrementor,
  });

  useEffect(() => {
    if (canvasId && !canvas) setCanvas(new fabric.Canvas(canvasId));
  }, [canvasId, canvas]);

  const stop = () => {
    setIsAnimating(false);
    requestRef.current && cancelAnimationFrame(requestRef.current);
  };

  const clear = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    canvas && canvas.clear();
  };

  useEffect(() => {
    if (!canvas || !artboardSize) return;
    canvas.setWidth(artboardSize.width);
    canvas.setHeight(artboardSize.height);
  }, [artboardSize, canvas]);

  const start = () => {
    if (!canvas) return;

    if (isAnimating) return;

    const { width, height } = artboardSize;
    const yCenter = height / 2;
    const stepSize = width / numSteps;

    points.length = 0;

    const yPosBase = yCenter + random(height * -0.25, height * 0.25);
    for (let x = 0; x <= width; x += stepSize) {
      points.push({ x, y: yPosBase });
    }

    setIsAnimating(true);
    update();
  };

  const update = () => {
    const color = lineColors.next().value;
    const stroke = `rgba(${color},${color},${color},${lineAlpha.next().value})`;

    points.forEach((point) => {
      point.y += random(yVariance * -1, yVariance);
    });

    const pathData = spline(points, 1, false);
    try {
      canvas &&
        canvas.add(
          new fabric.Path(pathData, {
            fill: "",
            stroke: stroke,
          })
        );
    } catch (e) {
      console.log(e);
    }

    requestRef.current = requestAnimationFrame(update);
  };

  return (
    <>
      <PageArea areaName={"artboard"}>{Artboard}</PageArea>
      <PageArea areaName={"controls"}>
        <ControlPanel>
          <Button onClick={() => (isAnimating ? stop() : start())}>
            {isAnimating ? "Stop" : "Draw"}
          </Button>
          <Button onClick={clear}>Clear</Button>
          <p>
            {artboardSize.width} x {artboardSize.height}
          </p>
        </ControlPanel>
      </PageArea>
    </>
  );
};
