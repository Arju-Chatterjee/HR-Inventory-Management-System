
import LoginPage from './LoginPage/LoginPage'

const Homepage = () => {
    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Left Section - Company Branding & Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex-col justify-between p-12">
                <div>
                    <h1 className="text-5xl font-bold mb-2">My Company</h1>
                    <p className="text-xl text-indigo-200">Solar Inventory Management System</p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Solar Equipment Tracking</h3>
                            <p className="text-indigo-200 text-sm">Manage solar panels, inverters, batteries, and pumps inventory</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Multi-Warehouse Management</h3>
                            <p className="text-indigo-200 text-sm">Track stock across multiple warehouse locations for efficient delivery</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Analytics & Reports</h3>
                            <p className="text-indigo-200 text-sm">Real-time insights on stock levels and customer delivery tracking</p>
                        </div>
                    </div>
                </div>

                <div className="text-indigo-200 text-sm">
                    © 2025 My Company - Empowering Sustainable Energy. All rights reserved.
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <LoginPage />
            </div>
        </div>
    )
}

export default Homepage
