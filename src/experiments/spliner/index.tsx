import React, { useEffect, useRef, useState } from "react";

import { Button } from "semantic-ui-react";
import { random, spline } from "@georgedoescode/generative-utils/src";

import { useSVGArtboard } from "../../hooks/useSVGArtboard";
import {
  IncrementingFunction,
  useIncrementingLooper,
} from "../../hooks/loopers";

import { ControlPanel } from "../../components/control-panel";

const alphaIncrementor: IncrementingFunction = (current) =>
  Math.round((current - 0.05) * 100) / 100;

const colorIncrementor: IncrementingFunction = (current: number) =>
  current + 10;

export const Spliner = () => {
  const { Artboard, getSvgInstance, getSvgSize } = useSVGArtboard();
  const [numSteps] = useState(8);
  const [yVariance] = useState(15);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const stop = () => {
    setIsAnimating(false);
    requestRef.current && cancelAnimationFrame(requestRef.current);
  };

  const clear = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    getSvgInstance().clear();
  };

  useEffect(() => {
    function handleResize() {
      stop();
      getSvgInstance().clear();
    }
    window.addEventListener("resize", handleResize);
  });

  const start = () => {
    if (isAnimating) return;

    console.log(getSvgSize());

    const { width, height } = getSvgSize();
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
      const path = getSvgInstance().path(pathData).stroke(stroke).fill("none");
      getSvgInstance().add(path);
    } catch (e) {
      console.log(e);
    }

    requestRef.current = requestAnimationFrame(update);
  };

  return (
    <>
      {Artboard}
      <ControlPanel className="controls">
        <Button onClick={() => (isAnimating ? stop() : start())}>
          {isAnimating ? "Stop" : "Start"}
        </Button>
        <Button onClick={clear}>Clear</Button>
      </ControlPanel>
    </>
  );
};
