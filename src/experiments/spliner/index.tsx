import React, { useEffect, useRef, useState } from "react";

import { fabric } from "fabric";

import { Button } from "semantic-ui-react";
import { useCanvasArtboard } from "../../hooks/artboards";

import { ControlPanel } from "../../components/control-panel";
import { PageArea } from "../../components/page-area";
import {
  IncrementingFunction,
  useIncrementingLooper,
  useValueLooper,
} from "../../hooks/loopers";

import { random, spline } from "@georgedoescode/generative-utils/src";
import { Color } from "@svgdotjs/svg.js";

const hueIncrementor: IncrementingFunction = (current: number) => ++current;

export const Spliner = () => {
  const { Artboard, artboardSize, canvasId } = useCanvasArtboard();
  const [canvas, setCanvas] = useState<fabric.StaticCanvas>();

  const points: IPoint2D[] = [];
  const requestRef = useRef<number>();

  /**
   * Adjust the height of each point on every update
   * The actual amount is +/- a percentage of the total canvas height,
   * selected at random from a range of 0 -> yVariance
   */
  const [yVariance] = useState(0.007);
  const [numSteps] = useState(15);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hueRange] = useState({ min: 160, max: 200 });
  const [dashArray] = useState([]);
  const [lineWidth] = useState([0.25, 0.5, 0.75, 1, 0.75, 0.5]);
  const [maxLines] = useState(300);

  const lineHues = useIncrementingLooper({
    startValue: hueRange.min,
    maxValue: hueRange.max,
    incrementor: hueIncrementor,
  });

  const lineWidths = useValueLooper(lineWidth);

  useEffect(() => {
    if (canvasId && !canvas) setCanvas(new fabric.StaticCanvas(canvasId));
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
    const { height } = artboardSize;
    const hue = lineHues.next();
    const sat = random(20, 90);
    const lum = 80 - sat * 0.7;
    const lineWidth = lineWidths.next();

    while (canvas && canvas?.getObjects().length > maxLines) {
      canvas.remove(canvas.getObjects()[0]);
    }

    const stroke = new Color([hue, sat, lum], "hsl");

    points.forEach((point) => {
      const yAmount = random(height * -yVariance, height * yVariance);
      point.y += yAmount;
    });

    const pathData = spline(points, 1, false);
    try {
      canvas &&
        canvas.add(
          new fabric.Path(pathData, {
            fill: "",
            stroke: stroke.toString(),
            strokeDashArray: dashArray,
            strokeWidth: lineWidth,
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
        </ControlPanel>
      </PageArea>
    </>
  );
};
