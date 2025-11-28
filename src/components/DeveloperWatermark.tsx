const DeveloperWatermark = () => {
    return (
        <div className="fixed bottom-6 left-6 z-[9999] pointer-events-none select-none">
            <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-xl"></div>

                {/* Main badge */}
                <div className="relative bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg">
                    <div className="flex items-center gap-2">
                        {/* Icon */}
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-gray-700/70">Developed by</span>
                            <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Arju with ♥️
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperWatermark;