import clientAxios from "./axiosConfig";

export const postPhoto = async (data, token) => 
    await clientAxios.post('/posts/uploadimages',
        data,
        {
            headers: {
                token
            }
        }
    )

export const postPublication = async (data, token) => 
    await clientAxios.post('/posts/postPublication',
        data,
        {
            headers: {
                token
            }
        }
    )

export const postDeletePublication = async (data, token) => 
    await clientAxios.post('/posts/postDeletePublication',
        data,
        {
            headers: {
                token
            }
        }
    )

export const getPublications = async (page, token) => 
    await clientAxios.get('/posts/getPublications',
        {
            headers: { token },
            params: { pageNumber: page }
        }
    )

