
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
function RegiesFinancieres() {
  const regies = [
    {
      name: "Direction Générale des impôts",
      logo: '/dgi-logo.png',
      pseudo: "DGI",
      link: "https://dgi.gouv.cd/"
    },
    {
      name: "Direction Générale des Douanes et Accises",
      logo: '/dgda-logo.jpeg',
      pseudo: "DGDA",
      link: "https://douane.gouv.cd/"
    }, {
      name: "Direction Générale des recettes administratives , judiciaires, domaniales et des participations",
      logo: '/dgrad-logo.jpeg',
      pseudo: "DGRAD",
      link: "https://dgrad.gouv.cd/"
    }
  ]
  return (<div className="container section">
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2 text-primary">Régies Financières</h1>
      <h2 className="text-xl font-bold mb-2">Ministère des Finances</h2>
      <p className="text-xl text-muted-foreground">République Démocratique du Congo</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
      {regies.map((regie) => (
        <Card key={regie.name}>
          <CardContent className='flex justify-center items-center p-2 h-32'>
            <Image src={regie.logo} alt={regie.name} width={100} height={100} className='object-cover' />
          </CardContent>
          <CardHeader className='p-2 text-center'>
            <CardTitle>{regie.name}</CardTitle>
            <CardDescription>{regie.pseudo}</CardDescription>
          </CardHeader>

          <CardFooter className='flex justify-center items-center'>
            <a href={regie.link} target='_blank' rel='noopener noreferrer'>
              <Button>Voir plus</Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>);
}

export default RegiesFinancieres;
