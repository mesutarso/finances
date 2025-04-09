import ContactForm from "@/components/contact/form"
import ContactInfo from "@/components/contact/infos"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Ministère des Finances",
    description: "Contactez le Ministère des Finances de la République Démocratique du Congo",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Contactez-nous</h1>
                        <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Pour toute question ou demande d'information, n'hésitez pas à nous contacter. Notre équipe est à votre
                            disposition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Contact Info on the left (7 columns) */}
                        <div className="lg:col-span-7">
                            <ContactInfo />
                        </div>

                        {/* Form on the right (5 columns) */}
                        <div className="lg:col-span-5">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
