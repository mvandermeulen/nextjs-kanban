'use client'
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export default function ColourPicker() {
    const [mounted, setMounted] = useState(false)
    const { theme: activeTheme, setTheme } = useTheme();
  
    const themes = [

        { name: 'red', colorClass: 'bg-red-500' },
        { name: 'orange', colorClass: 'bg-orange-500' },
        { name: 'amber', colorClass: 'bg-amber-500' },
        { name: 'yellow', colorClass: 'bg-yellow-500' },
        { name: 'lime', colorClass: 'bg-lime-500' },
        { name: 'green', colorClass: 'bg-green-500' },
        { name: 'emerald', colorClass: 'bg-emerald-500' },
        { name: 'teal', colorClass: 'bg-teal-500' },
        { name: 'cyan', colorClass: 'bg-cyan-500' },
        { name: 'sky', colorClass: 'bg-sky-500' },
        { name: 'blue', colorClass: 'bg-blue-500' },
        { name: 'indigo', colorClass: 'bg-indigo-500' },
        { name: 'violet', colorClass: 'bg-violet-500' },
        { name: 'purple', colorClass: 'bg-purple-500' },
        { name: 'fuchsia', colorClass: 'bg-fuchsia-500' },
        { name: 'pink', colorClass: 'bg-pink-500' },
        { name: 'rose', colorClass: 'bg-rose-500' },
        
    ];

    useEffect(() => {
      setMounted(true)
    }, [])
  
    if(!mounted) return null

    return (
        <>
        <ul className="gap-2 justify-center flex overflow-x-scroll no-scrollbar py-2 px-5">
            {themes.map(theme => (
                <li key={theme.name}>
                    <div 
                        onClick={() => setTheme(theme.name)} 
                        className={`rounded-full h-5 w-5 cursor-pointer ${theme.colorClass} ${activeTheme === theme.name ? 'ring-2 ring-offset-2 ring-offset-zinc-900 ring-primary' : ''}`}
                    />
                </li>
            ))}
        </ul>
        </>
    )
}