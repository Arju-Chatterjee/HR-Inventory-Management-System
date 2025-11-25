
import LoginPage from './LoginPage/LoginPage'

const Homepage = () => {
    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Left Section - Company Branding & Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex-col justify-between p-12">
                <div>
                    <h1 className="text-5xl font-bold mb-2">Dummy HR</h1>
                    <p className="text-xl text-indigo-200">Inventory Management System</p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Warehouse Tracking</h3>
                            <p className="text-indigo-200 text-sm">Monitor stock levels, incoming shipments, and sold items in real-time</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Item Management</h3>
                            <p className="text-indigo-200 text-sm">Add, update, and track items with complete details and valuations</p>
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
                            <p className="text-indigo-200 text-sm">Get insights on stock performance and inventory trends</p>
                        </div>
                    </div>
                </div>

                <div className="text-indigo-200 text-sm">
                    © 2025 Dummy HR. All rights reserved.
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
