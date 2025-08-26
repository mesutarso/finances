import { CheckCircle } from "lucide-react";

const Attributions = () => {
    const attributions = [
        "Politique monétaire, douanière, fiscale, parafiscale, comptable et des assurances de l'État",
        "Questions monétaires, Banques, organismes de crédit et micro-finance",
        "Suivi de la gestion de la Banque Centrale du Congo et particulièrement la situation du compte général du Trésor",
        "Contrôle du marché des assurances",
        "Mobilisation des ressources propres de l'État et des ressources extérieures",
        "Gestion des ressources propres et extérieures de l'État et encadrement des dépenses publiques",
        "Politique et gestion de la dette publique directe et indirecte ou extérieure de l'État",
        "Tenue, arrêt et consolidation des comptes de l'État et tenue de la Comptabilité publique",
        "Règlement définitif du budget, en collaboration avec le Ministère ayant le budget dans ses attributions",
        "Ordonnancement des dépenses de l'État",
        "Contrôle, à travers les audits externes, de la gestion financière des entreprises du portefeuille de l'État en collaboration avec le Ministère ayant le portefeuille dans ses attributions",
        "Autorisation préalable aux établissements publics, aux Entités Territoriales Décentralisées et autres services publics d'emprunter à l'extérieur lorsqu'il y a garantie de l'État",
        "Contentieux relatif aux mesures de zaïrianisation et de rétrocession",
        "Enregistrement des établissements des jeux de loterie",
        "Gestion des relations de coopération multilatérale du pays en matière financière",
        "Suivi de la gestion de tous les traités, Accords, Conventions, Protocoles d'Accords et Arrangements conclus avec les partenaires extérieurs et les organisations internationales en matière financière",
        "Assistance aux autres Ministères dans la recherche et la négociation des ressources extérieures dans le cadre de la coopération multilatérale"
    ];

    return (
        <div className="custom-content prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-primary mb-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        Attributions
                    </h2>
                    <p className="text-lg text-gray-700 leading-tight">
                        Les attributions du Ministère des Finances sont fixées comme suit :
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                    {attributions.map((attribution, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 p-1 bg-gradient-to-r from-blue-50/50 to-transparent  rounded-r-lg hover:from-blue-50 transition-colors duration-300"
                        >
                            <div className="flex-shrink-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                            </div>
                            <p className="text-gray-800 leading-normal text-base">
                                {attribution}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-5 bg-gradient-to-r from-primary/5 to-blue-50/50 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary text-lg">
                            Résumé des compétences
                        </h3>
                    </div>
                    <p className="text-gray-700 leading-normal text-base">
                        Le Ministère des Finances assure la gestion globale des finances publiques,
                        du contrôle monétaire, de la politique fiscale et de la coopération financière internationale
                        de la République Démocratique du Congo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Attributions;
