import { MapPin, Mail, Phone } from "lucide-react"

export default function ContactInfo() {
    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-2" />
                    Adresse
                </h2>
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-6 border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5383010653354!2d15.277906775280998!3d-4.3094154464043495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33261e071509%3A0x68cd21ddb5cf72eb!2sCentre%20financier%20de%20Kinshasa!5e0!3m2!1sfr!2scd!4v1744088046009!5m2!1sfr!2scd"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="bg-primary p-3 rounded-full">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Adresse</h3>
                            <p className="text-gray-600 mt-1">
                                Ministère des Finances
                                <br />
                                Centre Financier de Kinshasa
                                <br />
                                Kinshasa, République Démocratique du Congo
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="bg-primary p-3 rounded-full">
                            <Mail className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Email</h3>
                            <p className="text-gray-600 mt-1">
                                <a href="mailto:cabinet@finances.gouv.cd" className="hover:text-primary transition-colors">
                                    cabinet@finances.gouv.cd
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="bg-primary p-3 rounded-full">
                            <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Téléphone</h3>
                            <p className="text-gray-600 mt-1">
                                <a href="tel:+243829999945" className="hover:text-primary transition-colors">
                                    +243 82 99 99 945
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
