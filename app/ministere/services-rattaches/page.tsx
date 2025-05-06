import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { Users, Wallet, Archive, ClipboardCheck, ScrollText, Search, BarChart, Server, BrainCog } from 'lucide-react';


function ServicesConnexes() {
    const departments = [
        {
            name: "Cellule d'appui à l'ordonnateur national du fonds européen de développement ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "COFED",
        },
        {
            name: "Comité technique de suivi et évaluation des réformes ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "CTR",
        },
        {
            name: "Conseil permanent de la comptabilité au Congo ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "CPCC",
        },
        {
            name: "Ecole Nationale des finances ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "ENF",
        },
        {
            name: "Fonds National de la microfinance ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "FNM",
        },
        {
            name: "Comité Consultatif de lutte contre le blanchiment de capitaux et le financement du terrorisme et de la proliferation. ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "COLLUB",
        },
        {
            name: "Fonds de lutte contre le crime organisé ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "FOLUCCO",
        },
        {
            name: "Cellule d'exécution des financements en faveur des états fragiles ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "CFEF",
        },
        {
            name: "Cellule de gestion des projets et marchés publics entreprises ratachées ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "CGPMP",
        },
        {
            name: "Autorité de régulation et de contrôle des assurances ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "ARCA",
        },
        {
            name: "Bureau central de coordination ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "BCECO",
        },
        {
            name: "Direction générale de la dette publique ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "DGDP",
        },
        {
            name: "Cellule Nationale des renseignements financiers ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "CENAREF",
        },
        {
            name: "Direction générale de la tresorerie et de la comptabilité publique ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "DGTCP",
        },
        {
            name: "Caisse Générale d'épargne du Congo ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "CADECO",
        },
        {
            name: "Comité d'orientation de la reforme des finances publiques ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "COREF",
        },
        {
            name: "Société Nationale de lotterie ",
            icon: <BrainCog className="h-8 w-8" />,
            pseudo: "SONAL",
        },



    ]
    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">Services rattachés au Ministère des Finances</h1>

            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {departments.map((department, index) => (
                    <Card key={index} className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">{department.pseudo}</CardTitle>
                            <div className="text-primary">{department.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-md text-muted-foreground">{department.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ServicesConnexes;