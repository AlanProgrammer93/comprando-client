import clientAxios from "./axiosConfig";

export const postRegister = async (data) =>
    await clientAxios.post('/auth/register', data)

export const postLogin = async (data) =>
    await clientAxios.post('/auth/login', data)

export const currentUser = async (token) => 
    await clientAxios.get('/auth/current-user',
        {
            headers: {
                token
            }
        }
    )

