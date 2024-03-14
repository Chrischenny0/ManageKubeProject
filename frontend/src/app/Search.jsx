'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation'
import {useEffect, useState} from "react";
import { useDebounce } from 'use-debounce'

export default function Search({ path, placeholderText }) {
    const router = useRouter();
    const [text, setText] = useState('')
    const [query] = useDebounce(text, 1000)

    // Add debouncing to not throttle server
    useEffect(() => {
        if (!query) {
            router.push(`${path}`)
        } else {
            router.push(`${path}?search=${query}`)
        }
    }, [query, router]);

    return (
        <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </div>
            <input
                type={text}
                placeholder={ placeholderText || "Search friends" }
                onChange={e => setText(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500
                focus:outline-none focus:ring-primary-blue focus:border-primary-blue sm:text-sm"
            />
        </div>
    )
}