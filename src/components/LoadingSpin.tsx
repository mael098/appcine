export interface LoadingSpinProps {
    className?: string
}
export function LoadingSpin(props: LoadingSpinProps) {
    return (
        <div className={`aspect-square animate-spin border-4 rounded-full block border-transparent border-r-white border-t-white text-[transparent] ${props.className}`}>
            .
        </div>
    )
}