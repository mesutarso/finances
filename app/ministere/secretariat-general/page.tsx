
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, Wallet, Archive, ClipboardCheck, ScrollText, Search, BarChart, Server } from 'lucide-react'


function SecretaireGeneral() {
    const departments = [
        {
            name: "Direction des ressources humaines ",
            icon: <Users className="h-8 w-8" />,
            pseudo: "DRH",
        },
        {
            name: "Direction Administrative et financière ",
            icon: <Wallet className="h-8 w-8" />,
            pseudo: "DAF",
        },
        {
            name: "Direction des archives et des nouvelles technologies de l'information et de la communication ",
            icon: <Archive className="h-8 w-8" />,
            pseudo: "DANTIC",
        },
        {
            name: "Direction de règlementation et qualité comptable ",
            icon: <ClipboardCheck className="h-8 w-8" />,
            pseudo: "DRQC",
        },
        {
            name: "Direction de règlementation financière ",
            icon: <ScrollText className="h-8 w-8" />,
            pseudo: "DRF",
        },
        {
            name: "Direction d'audit et contrôle de gestion ",
            icon: <Search className="h-8 w-8" />,
            pseudo: "DAC",
        },
        {
            name: "Direction des systèmes d'information ",
            icon: <Server className="h-8 w-8" />,
            pseudo: "DSI",
        },
        {
            name: "Direction des études et planification ",
            icon: <BarChart className="h-8 w-8" />,
            pseudo: "DEP",
        },
    ]
    return (
        <div className="container section">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-primary">Secrétaire Général</h1>
                <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
                <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {departments.map((department, index) => (
                    <Card key={index} className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">{department.pseudo}</CardTitle>
                            <div className="text-primary">{department.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{department.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SecretaireGeneral