import React, { useRef, useState } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import { Artboard as GeneralArtboard } from "../../components/artboard";
import { useUniversalCounter } from "../universal-counter";

const type = "canvas";

const Wrap = styled.div`
  position: relative;
  height: 100%;

  * {
    position: absolute;
    top: 0;
    left: 0;

    &:first-child {
      right: 0;
      bottom: 0;
    }
  }
`;

const Canvas = styled.canvas``;

export const useCanvasArtboard = () => {
  const artboardRef = useRef<HTMLDivElement>(null);
  const canvasId = type + String(useUniversalCounter().next());
  const [artboardSize, setArtboardSize] = useState({ width: 0, height: 0 });
  useResizeObserver<HTMLElement>({
    ref: artboardRef,
    onResize: ({ width, height }) =>
      setArtboardSize({
        width: artboardRef.current?.offsetWidth || 0,
        height: artboardRef.current?.offsetHeight || 0,
      }),
  });

  const Artboard = (
    <Wrap ref={artboardRef}>
      <GeneralArtboard type={type}>
        <Canvas id={canvasId} />
      </GeneralArtboard>
    </Wrap>
  );

  return { Artboard, artboardSize, canvasId };
};
