import React from 'react'
import { useState } from 'react'
import { fetchUserData } from '../services/githubService'
const Search = () => {
    const [username, setUsername] = useState('')
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        console.log(e);
        setUsername(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log('clicked');
     try{
        const data = await fetchUserData(username);
        setUserData(data);
        console.log(data);
        setError(null)
     } catch (error) {
        setError('Looks like we cant find the user');
        setUserData(null);
     }
    };


  return (
    <>
     <form onSubmit={handleSearch}>
    <input className='border-b-2 border-blue-800 text-lg py-4 px-4 lg:w-[40%] mb-6 placeholder-slate-400' onChange={handleChange} type='text' name='search' value={username} placeholder='enter github username'/>
    <button type='submit' className='bg-blue-950 text-slate-100 text-2xl py-4 px-2 w-[200px] border rounded-2xl'>Enter</button>
    </form>
    {error && <p>{error}</p>}
    {userData && (
        <div>
          <h3>{userData.name}</h3>
          <p>{userData.bio}</p>
          <img src={userData.avatar_url} alt={userData.name} width="100" />
        </div>
      )}
    </>
  );
};

export default Search