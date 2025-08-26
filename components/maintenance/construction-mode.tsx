
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"
import { Link } from 'next-view-transitions'
import { Wrench, Clock, ArrowLeft, Home } from "lucide-react"

function ConstructionMode() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">


                {/* Main Icon with Animation */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-white p-6 rounded-full shadow-lg border-2 border-blue-100">
                            <Wrench className="w-16 h-16 text-blue-600 animate-bounce" />
                        </div>
                    </div>
                </div>


                <div className="space-y-6 animate-fade-in-delay">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Page en Construction
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Nous travaillons actuellement sur cette page pour vous offrir une expérience optimale.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                            <Clock className="w-5 h-5" />
                            <span className="text-sm">Mise à jour prochainement</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
                    <Button asChild size="lg" className="group">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Retour à l'accueil
                        </Link>
                    </Button>

                </div>


            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }
                .animate-fade-in-delay {
                    animation: fadeIn 1s ease-out 0.3s both;
                }
                .animate-fade-in-delay-2 {
                    animation: fadeIn 1s ease-out 0.6s both;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default ConstructionMode