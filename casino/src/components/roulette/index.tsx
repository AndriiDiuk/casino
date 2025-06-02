"use client";

import { rouletteTilesData } from "@/data";
import { Tiles } from "@/ui";
import { useEffect, useRef, useState } from "react";

export default function RandomScroller() {
  const SPIN_INTERVAL = 60000;
  const INITIAL_SPIN_DURATION = 1000;
  const SCROLL_TO_SELECTED_DURATION = 2000;
  const TILE_WIDTH = 116;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [shuffledTiles] = useState(() =>
    [...rouletteTilesData].sort(() => Math.random() - 0.5)
  );
  const [baseTiles] = useState(shuffledTiles);
  const [tiles] = useState(() => [
    ...shuffledTiles,
    ...shuffledTiles,
    ...shuffledTiles,
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(100);

  const startSpin = () => {
    if (!listRef.current || !containerRef.current) return;

    setSelectedIndex(null);

    listRef.current.style.transition = `left ${INITIAL_SPIN_DURATION}ms linear`;
    const fastScrollLeft = -TILE_WIDTH * 10;
    listRef.current.style.left = `${fastScrollLeft}px`;

    setTimeout(() => {
      const middleStart = baseTiles.length;
      const selectedTiles = baseTiles
        .map((tile, i) => ({ tile, index: i }))
        .filter(({ tile }) => tile.selected);
      const targetInBase =
        selectedTiles.length > 0
          ? selectedTiles[0].index
          : Math.floor(Math.random() * baseTiles.length);

      const targetIndex = middleStart + targetInBase;
      const containerWidth = containerRef.current!.offsetWidth;
      const targetLeft = containerWidth / 2 - TILE_WIDTH * (targetIndex + 0.5);

      listRef.current!.style.transition = `left ${SCROLL_TO_SELECTED_DURATION}ms ease-out`;
      listRef.current!.style.left = `${targetLeft}px`;

      setTimeout(() => {
        setSelectedIndex(targetIndex);
      }, SCROLL_TO_SELECTED_DURATION);
    }, INITIAL_SPIN_DURATION);
  };

  useEffect(() => {
    const resetLeft = () => {
      if (!listRef.current || !containerRef.current) return;
      const target =
        containerRef.current.offsetWidth / 2 -
        TILE_WIDTH * (baseTiles.length + 0.5);
      listRef.current.style.transition = "none";
      listRef.current.style.left = `${target}px`;
    };

    resetLeft();
    startSpin();
    const interval = setInterval(startSpin, SPIN_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = 100 - ((elapsed % SPIN_INTERVAL) / SPIN_INTERVAL) * 100;
      setProgress(percent);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full overflow-hidden py-8'>
      <div className='absolute bottom-0 left-0 h-[4px] w-full bg-white/10 z-20'>
        <div
          className='h-full bg-green-400 transition-all duration-100'
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className='pointer-events-none absolute top-0 bottom-0 left-0 w-[100px] z-10 bg-gradient-to-r from-[var(--background)] to-transparent' />
      <div className='pointer-events-none absolute top-0 bottom-0 right-0 w-[100px] z-10 bg-gradient-to-l from-[var(--background)] to-transparent' />

      <div
        ref={containerRef}
        className='overflow-hidden w-full h-full px-0 py-6 relative'
      >
        <div
          ref={listRef}
          style={{
            left: 0,
            position: "relative",
          }}
          className='flex gap-4'
        >
          {tiles.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={`${item.id}_${idx}`}
                className={`flex-shrink-0 relative w-[100px] h-[100px] flex items-center justify-center rounded-[8px] transition-all duration-300 ${
                  isSelected ? "scale-110" : ""
                }`}
              >
                {isSelected && (
                  <div className='absolute inset-0 flex items-center justify-center text-white z-10 text-sm flex-col leading-5'>
                    <span className='text-[14px] font-medium'>ROLLING IN:</span>
                    <span className='font-bold text-[20px]'>14.26</span>
                  </div>
                )}
                <div className='opacity-25'>
                  <Tiles variant={item.variant} type={item.type} size='lg' />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
