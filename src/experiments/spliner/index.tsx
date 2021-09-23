import React, { useEffect, useRef, useState } from "react";

import { Svg, SVG } from "@svgdotjs/svg.js";
import { Button } from "semantic-ui-react";
import { random, spline } from "@georgedoescode/generative-utils/src";

import { IPoint } from "../../types/math";

import { useArtboard } from "../../hooks/useArtboard";
import {
  IncrementingFunction,
  useIncrementingLooper,
} from "../../hooks/loopers";

import { ControlPanel } from "../../components/control-panel";

const alphaIncrementor: IncrementingFunction = (current) =>
  Math.round((current - 0.05) * 100) / 100;
const colorIncrementor: IncrementingFunction = (current: number) =>
  current + 30;

export const Spliner = () => {
  const { Artboard, svgInstance, getSvgSize } = useArtboard();

  const artboardRef = useRef<SVGSVGElement>(null);
  const [numSteps] = useState(8);
  const [svg, setSvg] = useState<Svg>(SVG() as Svg);
  const [yVariance] = useState(15);
  const [isAnimating, setIsAnimating] = useState(false);

  const requestRef = useRef<number>();

  const lineAlpha = useIncrementingLooper({
    startValue: 0.1,
    minValue: 0.5,
    incrementor: colorIncrementor,
  });

  const lineColors = useIncrementingLooper({
    startValue: 100,
    maxValue: 255,
    incrementor: alphaIncrementor,
  });

  const points: IPoint[] = [];

  useEffect(() => {
    if (!artboardRef.current || !svgInstance) return;
    setSvg(svgInstance);
  }, [svgInstance]);

  const stop = () => {
    setIsAnimating(false);
    requestRef.current && cancelAnimationFrame(requestRef.current);
  };

  const clear = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    svg.clear();
  };

  useEffect(() => {
    function handleResize() {
      stop();
      svg.clear();
    }
    window.addEventListener("resize", handleResize);
  });

  const start = () => {
    if (isAnimating) return;

    const { width, height } = getSvgSize(artboardRef.current);
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

    const path = svg.path(pathData).stroke(stroke).fill("none");

    svg.add(path);

    requestRef.current = requestAnimationFrame(update);
  };

  return (
    <>
      <Artboard ref={artboardRef} />
      <ControlPanel className="controls">
        <Button onClick={() => (isAnimating ? stop() : start())}>
          {isAnimating ? "Stop" : "Start"}
        </Button>
        <Button onClick={clear}>Clear</Button>
      </ControlPanel>
    </>
  );
};
