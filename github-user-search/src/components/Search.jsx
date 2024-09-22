import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'location') setLocation(value);
        if (name === 'minRepos') setMinRepos(value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUserData(null);
        try {
            const data = await fetchUserData(username, location, minRepos);
            setUserData(data);
            setError(null);
        } catch (error) {
            setError("Looks like we can't find the user");
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        GitHub Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter GitHub username"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={location}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter location"
                    />
                </div>
                <div>
                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
                        Minimum Repositories
                    </label>
                    <input
                        id="minRepos"
                        name="minRepos"
                        type="number"
                        value={minRepos}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter minimum repositories"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>
            {loading && <p className="mt-4 text-center">Loading...</p>}
            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            {userData && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold">{userData.name}</h3>
                    <p>{userData.bio}</p>
                    <p>Login: {userData.login}</p>
                    <p>Location: {userData.location}</p>
                    <p>Repositories: {userData.public_repos}</p>
                    <img src={userData.avatar_url} alt={userData.name} width="100" className="mt-2 rounded-full" />
                </div>
            )}
        </div>
    );
};

export default Search;