import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">

            <div className="text-center">

                <h1 className="text-8xl md:text-9xl font-bold text-blue-600">
                    404
                </h1>

                <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-500 max-w-md mx-auto">
                    Sorry, the page you're looking for doesn't exist
                    or has been moved.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all active:scale-95"
                >
                    Go Back Home
                </button>

            </div>

        </div>
    )
}

export default NotFound