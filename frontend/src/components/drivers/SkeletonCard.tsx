export default function SkeletonCard(){
    return(
        <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-600 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    )
}