const zileanOrigin = "http://localhost:3001";

interface ZileanResponse {
    data?: any;
    error?: string;
}

export const getUserFromSession = async (sessionCookie: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/get-user`, {
        method: "GET",
        headers: {
            cookie: sessionCookie,
        },
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Not Logged In!",
        };
    }
    return {
        data,
    };
};

export const login = async (user: { email: string; password: string }): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!data || res.status !== 200) {
        return {
            error: "Error logging out.",
        };
    } else {
        return {
            data: "Succesfully logged in user!",
        };
    }
};

export const logout = async (sessionCookie: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/logout`, {
        method: "POST",
        headers: {
            cookie: sessionCookie,
        },
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error logging out.",
        };
    }
    return {
        data,
    };
};
