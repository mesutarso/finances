'use client'
import { Loader2 } from "lucide-react"
import Logo from "@/components/shared/logo"

export default function Loading() {
    return (
        <div className="conatianer section min-h-screen flex flex-col items-center justify-center space-y-8">
            <div className="">
                <Logo type="dark" />
            </div>

            <div className="flex items-center justify-center space-x-2 text-slate-600">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-sm">Chargement en cours...</span>
            </div>

            <div className="mt-8 w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-slate-700 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
        </div>
    )
}