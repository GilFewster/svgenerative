import React from "react";
import useResizeObserver from "@react-hook/resize-observer";

const zeroSize = new DOMRect(0, 0, 0, 0);

export const useSize = (target: React.RefObject<HTMLElement> | null) => {
  const [size, setSize] = React.useState<DOMRect>(zeroSize);

  React.useLayoutEffect(() => {
    const size = target?.current?.getBoundingClientRect() || zeroSize;
    setSize(size);
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
