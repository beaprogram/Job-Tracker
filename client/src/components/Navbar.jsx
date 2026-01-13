import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Job Tracker
                </Link>
                <div className="space-x-4">
                    <Link to="/login" className="hover:text-blue-200">
                        Login
                    </Link>
                    <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;