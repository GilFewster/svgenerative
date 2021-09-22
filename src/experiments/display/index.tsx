import React, { useEffect, useRef } from "react";
import { useArtboard } from "../../hooks/useArtboard";

export const Display = () => {
  const artboardRef = useRef<SVGSVGElement>(null);
  const { Artboard, svgInstance } = useArtboard();

  useEffect(() => {
    if (!artboardRef.current || !svgInstance) return;
    svgInstance.rect(200, 200).fill("#334499");
  });

  return (
    <>
      <Artboard ref={artboardRef} />
      <div className="controls">
        <p>hello</p>
      </div>
    </>
  );
};
