'use client'

import clsx from "clsx";
import { debounce } from "lodash";
import { RefObject, useEffect, useRef, useState } from "react"

const useResizeObserver = (ref: RefObject<HTMLElement>, callback: (observerEntry: ResizeObserverEntry) => void) => {
  const observer = useRef(new ResizeObserver((entries) => {
    for (const entry of entries) {
      callback(entry)
    }
  }));

  useEffect(() => {
    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.current.unobserve(ref.current);
      }
    };
  }, [ref]);

  return observer;
};

const GRAIN_THICKNESS = 20


// TODO: Re-implement the logic in a canvas instead of DOM elements
const GravityGrid = () => {
  const [pageHeight, setPageHeight] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const [sandMap, setSandMap] = useState<Map<string, undefined>>()

  const rowsCount = Math.floor(pageHeight / GRAIN_THICKNESS)
  const colsCount = Math.floor(pageWidth / GRAIN_THICKNESS)

  const ref = useRef<HTMLElement>(null);
  useResizeObserver(ref, debounce(() => {
    if (ref.current) {
      setPageHeight(ref.current.clientHeight)
      setPageWidth(ref.current.clientWidth)
    }
  }, 200));

  const onGrainClick = ({ x, y }: { x: number, y: number }) => {
    setSandMap(() => {
      const newSandMap = new Map(sandMap)
      newSandMap.set(`${x}-${y}`, undefined)
      return newSandMap
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSandMap((prev) => {
        const newMap = new Map()
        if (!prev) {
          return newMap
        }
        for (const [key] of prev) {
          const [x, y] = key.split('-').map(Number)
          const checkBoundaries = {
            x: (x: number) => x >= 0 && x < colsCount,
            y: (y: number) => y < rowsCount
          }
          const coords = {
            south: { str: `${x}-${y + 1}`, x, y: y + 1 },
            southWest: { str: `${x - 1}-${y + 1}`, x: x - 1, y: y + 1 },
            southEast: { str: `${x + 1}-${y + 1}`, x: x + 1, y: y + 1 }
          }

          if (checkBoundaries.y(coords.south.y) && !prev.has(coords.south.str)) {
            newMap.set(coords.south.str, undefined)
          } else if (checkBoundaries.y(coords.south.y) && prev.has(coords.south.str)) {
            switch (Math.round(Math.random())) {
              case 0:
                if (checkBoundaries.x(coords.southWest.x) && !prev.has(coords.southWest.str)) {
                  newMap.set(coords.southWest.str, undefined)
                } else if (checkBoundaries.x(coords.southEast.x) && !prev.has(coords.southEast.str)) {
                  newMap.set(coords.southEast.str, undefined)
                } else {
                  newMap.set(key, undefined)
                }
                break
              case 1:
                if (checkBoundaries.x(coords.southEast.x) && !prev.has(coords.southEast.str)) {
                  newMap.set(coords.southEast.str, undefined)
                } else if (checkBoundaries.x(coords.southWest.x) && !prev.has(coords.southWest.str)) {
                  newMap.set(coords.southWest.str, undefined)
                } else {
                  newMap.set(key, undefined)
                }
                break
            }
          } else {
            newMap.set(key, undefined)
          }
        }

        return newMap
      })
    }, 100);

    // Clearing the interval
    return () => clearInterval(interval);
  }, [colsCount, rowsCount]);

  return <section ref={ref} className="w-full flex overflow-hidden">
    {/** Cols */}
    {Array.from({ length: colsCount }).map((_, x) => (
      <div key={x} className={`w-[${GRAIN_THICKNESS}px] flex flex-col flex-1`} >
        {/** Rows */}
        {Array.from({ length: rowsCount }).map((_, y) => (
          <div key={`${x}-${y}`} onClick={() => {
            onGrainClick({ x, y })
          }} className={clsx(`h-[${GRAIN_THICKNESS}px] flex flex-1 hover:bg-white/20`, {
            'bg-yellow-800': sandMap?.has(`${x}-${y}`)
          })} />
        ))}
      </div>
    ))}
  </section>
}

export default GravityGrid