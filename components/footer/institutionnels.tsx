import { INSTITUTIONNELS } from '@/lib/constants'


function Institutionnels() {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Institutionnels</h3>
            <ul className="flex flex-col gap-2">
                {INSTITUTIONNELS.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Institutionnels