'use client'
import { useQuery } from '@tanstack/react-query';
import { cabinetQuery } from '@/lib/react-query/ministere/options';
import { CabinetSection } from './cabinet-section';

function CabinetContent() {
    const { data } = useQuery(cabinetQuery);
    return (
        <div>

            <CabinetSection title="Directeur de Cabinet" members={[data.dircab]} level="primary" />
            <CabinetSection title="Directeur adjoint" members={data.dircaba} level="secondary" />
            <CabinetSection title="Coordonnateurs" members={data.coordonnateurs} level="tertiary" />
            <CabinetSection title="Conseillers" members={data.conseillers} level="quaternary" />
        </div>
    )
}

export default CabinetContent;