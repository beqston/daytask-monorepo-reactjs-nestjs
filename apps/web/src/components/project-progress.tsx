interface ProjectProgressProps{
    percentage:number;
    size?:number;
    strokeWidth?:number;
}
export default function ProjectProgress({size=120, strokeWidth=4, percentage}:ProjectProgressProps){
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference; 
    return(
        <div className="relative inline-flex justify-center items-center">
            <svg width={size} height={size} className="rotate-30 origin-center">
                {/* background circle */}
                <circle 
                    cx={size / 2}
                    cy={size / 2}
                    stroke="#2C4653"
                    strokeWidth={strokeWidth}
                    r={radius}
                    fill="transparent"
                />

                {/* progress circle */}
                <circle 
                    cx={size / 2}
                    cy={size / 2}
                    stroke="#FED36A"
                    strokeWidth={strokeWidth}
                    r={radius}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                />
            </svg>
            {/* centre text */}
            <span className="absolute text-sm font-semibold text-white">
                {percentage}%
            </span>
        </div>
    )
}