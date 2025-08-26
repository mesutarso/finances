'use client'
import { useQuery } from '@tanstack/react-query';
import { cabinetQuery } from '@/lib/react-query/ministere/options';
import { CabinetSection } from './cabinet-section';

function CabinetContent() {
    const { data } = useQuery(cabinetQuery);
    return (
        <div>
            <CabinetSection title="Directeur de Cabinet" members={[data?.dircab]} level="primary" />
            {data?.dircaba[0]?.noms && <CabinetSection title="Directrice de Cabinet Adjointe" members={data?.dircaba} level="secondary" />}
            <CabinetSection title="Coordonnateur" members={data?.coordonnateurs} level="tertiary" type="double" />

        </div>
    )
}

export default CabinetContent;