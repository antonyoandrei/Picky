export const createUser = async (userObject: {}) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userObject)
        });
        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export const getUserByEmail = async (getToken: any, userEmail: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const token = await getToken();
        const response = await fetch(`${url}/user/email/${userEmail}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const dataFetched = await response.json();
        return [response, dataFetched];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return [null, null];
    }
}
