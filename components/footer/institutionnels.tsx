import { INSTITUTIONNELS } from '@/lib/constants'


function Institutionnels() {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Sites institutionnels</h3>
            <ul className="flex flex-col gap-2">
                {INSTITUTIONNELS.map((link) => (
                    <li key={link.label} className="text-md text-gray-50 hover:text-white transition-all duration-300 ease-in-out hover:translate-x-2">
                        <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Institutionnels