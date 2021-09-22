import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Svg, SVG } from "@svgdotjs/svg.js";

import { random, spline } from "@georgedoescode/generative-utils/src";

import { useArtboard } from "../../hooks/useArtboard";

type Point = { x: number; y: number };

const Controls = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px auto 0 auto;
  width: 200px;
`;

const Button = styled.button`
  border: solid 1px #acacac;
  text-transform: uppercase;
  min-width: 80px;
  padding: 0.5em 0.25em;
  border-radius: 5px;
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  background: #fff;

  &:hover {
    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.5);
    font-size: 0.9em;
    background: linear-gradient(
      153deg,
      rgba(238, 238, 238, 1) 0%,
      rgba(255, 255, 255, 1) 30%,
      rgba(228, 228, 228, 1) 100%
    );
  }
`;

export const Spliner = () => {
  const { Artboard, svgInstance, getSvgSize } = useArtboard();

  const artboardRef = useRef<SVGSVGElement>(null);
  const [numSteps] = useState(8);
  const [isFilled] = useState(false);
  const [svg, setSvg] = useState<Svg>(SVG() as Svg);
  const [yVariance] = useState(15);
  const [isAnimating, setIsAnimating] = useState(false);

  const requestRef = useRef<number>();
  const canvasState = useRef({
    alpha: 1,
    color: 0,
  });

  const points: Point[] = [];

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
    const alpha = canvasState.current.alpha - 0.01;
    const color = canvasState.current.color + 10;

    points.forEach((point) => {
      point.y += random(yVariance * -1, yVariance);
    });

    const pathData = spline(points, 1, false);

    const path = svg
      .path(pathData)
      .stroke(`rgba(${color},${color},${color},${alpha})`)
      .fill(isFilled ? "#333" : "none");

    svg.add(path);

    canvasState.current = {
      alpha: alpha <= 0.4 ? 1 : alpha,
      color: color >= 170 ? 0 : color,
    };

    requestRef.current = requestAnimationFrame(update);
  };

  return (
    <>
      <Artboard ref={artboardRef} />
      <Controls className="controls">
        <Button onClick={() => (isAnimating ? stop() : start())}>
          {isAnimating ? "Stop" : "Start"}
        </Button>
        <Button onClick={clear}>Clear</Button>
      </Controls>
    </>
  );
};
