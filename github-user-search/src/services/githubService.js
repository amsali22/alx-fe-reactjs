import axios from 'axios'
    const BASE_URL = 'https://api.github.com/search/users?q'

    export const fetchUserData = async(username,location='', minRepos = '', perPage = 30, page = 1) => {
        let query = `=${username}`;

        if (location) {
            query += `+location:${location}`;
        }

        if (minRepos) {
            query += `+repos:>=${minRepos}`;
        }

        try{
            const response = await axios.get(`${BASE_URL}${query}&per_page=${perPage}&page=${page}`);
            const users = response.data.items;

            const detailedUsers = await Promise.all(
                users.map(async (user) => {
                    const userDetailsResponse = await axios.get(user.url);
                    return userDetailsResponse.data;  
                })
            );
    
            return {
                total_count: response.data.total_count,
                users: detailedUsers,
            };

        } catch(err) {
        throw err;
    }
    };
  