import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Svg, SVG } from "@svgdotjs/svg.js";
import { random, spline } from "@georgedoescode/generative-utils/src";

type Point = { x: number; y: number };

const Canvas = styled.div<{ width: number; height: number }>`
  margin: 0 auto;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  svg {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background: white;
  }
`;

const Controls = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px auto 0 auto;
  max-width: 200px;
`;

const Button = styled.button`
  border: solid 1px #acacac;
  background: white;
  text-transform: uppercase;
`;

const canvasClassName = "canvas";

export const Spliner = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [numSteps, setNumSteps] = useState(25);
  const [isAnimating, setIsAnimating] = useState(false);
  const [svg, setSvg] = useState<Svg>(SVG() as Svg);
  const [yVariance, setYVariance] = useState(2);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const requestRef = useRef<number>();
  const canvasState = useRef({
    alpha: 1,
    color: 0,
  });

  const paths: any[] = [];
  const points: Point[] = [];

  useEffect(() => {
    if (!canvasRef.current) return;
    const svgInstance = SVG(`.${canvasClassName}`) as Svg;
    svgInstance.clear();
    setSvg(svgInstance);
    setCanvasSize(svgInstance.viewbox());
  }, [canvasRef]);

  useEffect(() => {
    if (isAnimating) {
      start();
    } else {
      stop();
    }
  }, [isAnimating]);

  const stop = () => {
    if (!requestRef.current) return;
    cancelAnimationFrame(requestRef.current);
  };

  const clear = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    svg.clear();
  };

  const start = () => {
    const { width, height } = canvasSize;
    const yCenter = height / 2;
    const stepSize = width / numSteps;
    points.length = 0;
    const yPosBase = yCenter + random(height * -0.25, height * 0.25);
    for (let x = 0; x <= width; x += stepSize) {
      points.push({ x, y: yPosBase });
    }

    update();
  };

  const update = () => {
    if (!svg) return;
    // svg.clear();

    const alpha = canvasState.current.alpha - 0.01;
    const color = canvasState.current.color + 10;

    points.forEach((point) => {
      point.y += random(yVariance * -1, yVariance);
    });

    const pathData = spline(points, 1, false);

    const path = svg
      .path(pathData)
      .stroke(`rgba(${color},${color},${color},${alpha})`)
      .fill("none");

    paths.unshift(path);
    paths.length = Math.min(paths.length, 1);

    paths.forEach((path) => svg.add(path));

    canvasState.current = {
      alpha: alpha <= 0.4 ? 1 : alpha,
      color: color >= 170 ? 0 : color,
    };

    requestRef.current = requestAnimationFrame(update);
  };

  return (
    <>
      <Canvas ref={canvasRef} width={width} height={height}>
        <svg className={canvasClassName} viewBox={`0 0 ${width} ${height}`} />
      </Canvas>
      <Controls>
        <Button onClick={() => setIsAnimating((isAnimating) => !isAnimating)}>
          {isAnimating ? "Stop" : "Start"}
        </Button>
        <Button onClick={clear}>Clear</Button>
      </Controls>
    </>
  );
};
