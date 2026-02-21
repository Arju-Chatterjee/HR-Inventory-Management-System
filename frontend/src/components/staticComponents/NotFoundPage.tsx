import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        {/* Large 404 Text */}
                        <h1 className="text-[180px] md:text-[220px] font-bold text-black leading-none">
                            404
                        </h1>

                        {/* Animated Icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg
                                className="w-24 h-24 text-indigo-600 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg mb-2">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        It seems you've reached a URL that doesn't exist in our system.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Go to Dashboard
                    </button>
                </div>

                {/* Additional Help Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 text-sm mb-4">Need help? Try these:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline"
                        >
                            Dashboard
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                            onClick={() => navigate('/inventory')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline"
                        >
                            Inventory
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                            onClick={() => navigate('/reports')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline"
                        >
                            Reports
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                            onClick={() => navigate('/contactUs')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NotFoundPage