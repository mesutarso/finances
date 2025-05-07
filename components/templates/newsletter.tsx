import * as React from 'react';
import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

const NewsletterTemplate = () => {
    return (
        <Html lang="fr" dir="ltr">
            <Head />
            <Preview>Bienvenue à la newsletter du Ministère des Finances</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[600px]">
                        <Section>
                            <Heading className="text-[24px] font-bold text-center text-gray-800 my-[16px]">
                                Ministère des Finances
                            </Heading>
                            <Hr className="border-gray-200 my-[16px]" />
                            <Heading className="text-[20px] font-bold text-gray-800 my-[16px]">
                                Bienvenue à notre Newsletter!
                            </Heading>
                            <Text className="text-[16px] text-gray-600 mb-[16px]">
                                Cher(e) abonné(e),
                            </Text>
                            <Text className="text-[16px] text-gray-600 mb-[16px]">
                                Nous vous remercions de vous être inscrit(e) à la newsletter officielle du Ministère des Finances. Votre inscription a été confirmée avec succès.
                            </Text>
                            <Text className="text-[16px] text-gray-600 mb-[16px]">
                                <strong>En tant qu'abonné(e), vous aurez accès aux informations suivantes :</strong>
                            </Text>
                            <Section className="pl-[16px]">
                                <Text className="text-[16px] text-gray-600 m-0">• Les dernières mises à jour économiques et financières</Text>
                                <Text className="text-[16px] text-gray-600 m-0">• Les actualités du secteur bancaire et financier</Text>
                                <Text className="text-[16px] text-gray-600 m-0">• Les rapports, statistiques, études et analyses</Text>
                                <Text className="text-[16px] text-gray-600 m-0">• Les annonces de politiques financières, monétaires et fiscales</Text>
                                <Text className="text-[16px] text-gray-600 m-0">• Les événements et perspectives économiques</Text>
                            </Section>
                            <Section className="my-[24px] text-center">
                                <Button
                                    className="bg-blue-600 text-white font-bold py-[12px] px-[24px] rounded-[4px] no-underline text-center box-border"
                                    href="https://finances.gouv.cd"
                                >
                                    Visiter notre site web
                                </Button>
                            </Section>
                            <Text className="text-[16px] text-gray-600 mb-[16px]">
                                Nous vous enverrons régulièrement des informations pertinentes pour vous tenir informé(e) des développements importants dans le secteur financier de notre pays.
                            </Text>
                            <Text className="text-[16px] text-gray-600 mb-[24px]">
                                Merci de votre intérêt pour nos activités.
                            </Text>
                            <Text className="text-[16px] text-gray-600 mb-[8px]">
                                Cordialement,
                            </Text>
                            <Text className="text-[16px] font-bold text-gray-800 mb-[24px]">
                                L'équipe du Ministère des Finances
                            </Text>
                            <Hr className="border-gray-200 my-[16px]" />
                            <Section className="mt-[32px]">
                                <Text className="text-[14px] text-gray-500 text-center m-0">
                                    © {new Date().getFullYear()} Ministère des Finances. Tous droits réservés.
                                </Text>
                                <Text className="text-[14px] text-gray-500 text-center m-0">
                                    Centre Financier de Kinshasa
                                </Text>
                                <Text className="text-[14px] text-gray-500 text-center m-0">
                                    1 Zongotolo, Kinshasa - Gombe, RDC
                                </Text>
                                <Text className="text-[14px] text-gray-500 text-center mt-[8px]">
                                    <Link href="mailto:cabinet@finances.gouv.cd" className="text-blue-600 underline">
                                        cabinet@finances.gouv.cd
                                    </Link>
                                </Text>
                                {/* <Text className="text-[14px] text-gray-500 text-center mt-[8px]">
                                    <Link href="https://finances.gouv.cd/unsubscribe" className="text-blue-600 underline">
                                        Se désabonner
                                    </Link>
                                </Text> */}
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default NewsletterTemplate;
