import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUserData(null);
        try {
            const data = await fetchUserData(username);
            setUserData(data);
            setError(null);
        } catch (error) {
            setError("Looks like we cant find the user");
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    className='border-b-2 border-blue-800 text-lg py-4 px-4 lg:w-[40%] mb-6 placeholder-slate-400'
                    onChange={handleChange}
                    type='text'
                    name='search'
                    value={username}
                    placeholder='enter github username'
                />
                <button
                    type='submit'
                    className='bg-blue-950 text-slate-100 text-2xl py-4 px-2 w-[200px] border rounded-2xl'
                >
                    Enter
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {userData && (
                <div>
                    <h3>{userData.name}</h3>
                    <p>{userData.bio}</p>
                    <p>Login: {userData.login}</p>
                    <img src={userData.avatar_url} alt={userData.name} width="100" />
                </div>
            )}
        </>
    );
};

export default Search;