import { currencyFormat } from '@/lib/utils';
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to the correct values
    useEffect(() => {
        if (range.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxValRef.current);

            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to the correct values
    useEffect(() => {
        if (range.current) {
            const minPercent = getPercent(minValRef.current);
            const maxPercent = getPercent(maxVal);

            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange(minVal, maxVal);
    }, [minVal, maxVal, onChange]);

    return (
        <div className="relative w-full py-4 my-2">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="absolute w-full h-0 pointer-events-none appearance-none z-10"
                style={{ zIndex: minVal > max - 100 ? '5' : '3' }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="absolute w-full h-0 pointer-events-none appearance-none z-10"
            />

            <div className="relative h-1">
                <div className="absolute w-full h-1.5 bg-gray-300 rounded" />
                <div ref={range} className="absolute h-1.5 bg-primary-600 rounded" />
            </div>

            <div className="relative h-5">
                <div className="absolute top-0 w-full py-5">
                    <div className="flex flex-row gap-2 justify-between items-center">
                        <div className="text-sm w-5/12">
                            <span className='text-sm'>Min</span> <br /> {currencyFormat(minVal)}
                        </div>
                        <span className="text-sm w-2/12 text-center">-</span>
                        <div className="text-sm w-5/12 text-right"><span className='text-xs'>Max </span> <br /> {currencyFormat(maxVal)}</div>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default MultiRangeSlider;