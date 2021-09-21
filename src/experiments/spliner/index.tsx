import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  Svg,
  SVG,
  Rect,
  Element as SVGElement,
  Dom as SVGDom,
} from "@svgdotjs/svg.js";

const Canvas = styled.div`
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
  margin-top: 20px;
`;

const Button = styled.button`
  border: solid 1px #acacac;
  background: white;
  text-transform: uppercase;
`;

// import {
//   random,
//   map,
//   spline,
//   pointsInPath,
// } from "@georgedoescode/generative-utils";

export const Spliner = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [numSteps, setNumSteps] = useState(5);
  const [stepSize, setStepSize] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [svg, setSvg] = useState<Svg>(SVG() as Svg);

  let strokeAlpha = 1;
  let strokeColor = 0;
  let animFrame = null;
  const points = [];

  useEffect(() => {
    if (!svg) return;
  }, [numSteps, canvasSize]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const svgInstance = SVG(".canvas") as Svg;
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
    console.log("stop");
    svg.clear();
  };
  const start = () => {
    console.log("start");
    const { width, height } = canvasSize;
    svg.rect(width, height).fill("#ffff06");
  };

  return (
    <>
      <Canvas ref={canvasRef}>
        <svg className="canvas" viewBox="0 0 200 100" />
      </Canvas>
      <Controls>
        <Button onClick={() => setIsAnimating((isAnimating) => !isAnimating)}>
          {isAnimating ? "Stop" : "Start"}
        </Button>
      </Controls>
    </>
  );
};
