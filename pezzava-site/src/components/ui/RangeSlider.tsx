'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  prefix?: string;
}

export default function RangeSlider({ 
  min, 
  max, 
  step = 1, 
  value, 
  onChange, 
  label,
  prefix = ''
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const minValRef = useRef(value[0]);
  const maxValRef = useRef(value[1]);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current !== null) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current !== null) {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange([minVal, maxVal]);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      {label && (
        <div className="flex justify-between items-center">
          <span className="font-subheader text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">
            {label}
          </span>
          <span className="font-display italic text-lg">
            {prefix}{minVal} — {prefix}{maxVal}
          </span>
        </div>
      )}

      <div className="relative h-10 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - step);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 h-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
          style={{ zIndex: minVal > max - 100 ? 15 : 11 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + step);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 h-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
        />

        <div className="relative w-full">
          <div className="absolute h-[0.5px] bg-black/10 w-full z-0" />
          <div ref={range} className="absolute h-[0.5px] bg-black z-1" />
        </div>
      </div>
    </div>
  );
}
