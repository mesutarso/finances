interface HeadingProps {
    title: string
    color: "red" | "blue" | "yellow"
}

export default function Heading({ title, color }: HeadingProps) {

    const colorMap = {
        red: "bg-red",
        blue: "bg-blue",
        yellow: "bg-yellow",
    }

    return (
        <div className="relative inline-block">
            <h2 className="text-3xl font-bold text-primary">{title}</h2>
            <div className={`h-[3px] mt-1 ${colorMap[color]}`} style={{ width: "100%" }} />
        </div>
    )
}

