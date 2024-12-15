"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Perpage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const params = new URLSearchParams(searchParams);
        params.set("limit", e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <select className="py-1 px-2 pr-6 border-gray-400 rounded-sm border-0"
            onChange={(e) => handleChange(e)}
            defaultValue={12}>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="32">32</option>
            <option value="52">50+</option>
        </select>
    )
}
