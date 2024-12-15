"use client"

import DOMPurify from 'isomorphic-dompurify'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function LongDescription({ description }: { description: string }) {

    const [clamp, setClamp] = useState<number>(2)

    return (
        <div>
            <div className={`text-gray-800 line-clamp-${clamp} transition-all duration-500`}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(description.replaceAll("\n", "<br>"))
                }}
            ></div>

            <button onClick={() => { clamp > 0 ? setClamp(0) : setClamp(2) }} className='text-sm py-1 text-slate-500 transition-all duration-300'>
                {
                    clamp > 0 ? (<span className='inline-flex items-center justify-end'> Read More <ChevronDown className='text-slate-300' /></span>) : (<span className='inline-flex items-center'>Collapse <ChevronUp className='text-slate-300' /></span>)
                }
            </button>

        </div>
    )
}
