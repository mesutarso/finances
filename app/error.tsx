'use client'

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {

        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">Une erreur est survenue</h1>
            <p className="mb-8 max-w-md text-slate-600">
                Nous sommes désolés, mais une erreur inattendue s'est produite. Notre équipe technique a été informée du
                problème.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
                <button
                    onClick={() => reset()}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                    Réessayer
                </button>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}
