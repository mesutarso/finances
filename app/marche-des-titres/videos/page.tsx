import React from 'react'

export default function Videos() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-3">Vidéos — Marché des titres</h1>
                        <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Retrouvez ici bientôt toutes les vidéos liées au marché des titres.
                        </p>
                    </div>

                    <div className="text-center mt-12">
                        <div className="text-8xl">🎬</div>
                        <p className="mt-6 text-lg text-gray-700">Les vidéos seront disponibles bientôt.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}