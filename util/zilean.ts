export const zileanOrigin = process.env.NEXT_PUBLIC_ZILEAN_ORIGIN || "http://localhost:3001";

interface ZileanResponse {
    data?: any;
    error?: string;
}

/* 
    Pass session cookie in request to backend --
    when making requests within getServerSideProps,
    we need to explicity attach the cookie or else it doesn't get sent.
    No need to do this within a client-side request. 
*/
export const getUserFromSession = async (cookie: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account`, {
        method: "GET",
        headers: {
            Cookie: cookie,
        },
        credentials: "include",
    });
    return await result.json();
};

export const getUserFromID = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account/` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await result.json();
};

export const getUserFromUsername = async (username: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account/findUser/` + username, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await result.json();
};

export const register = async (user: {
    email: string;
    username: string;
    password: string;
}): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/account/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
    });
    const data = await res.json();
    if (!data || res.status !== 200) {
        return {
            error: "Error registering user.",
        };
    } else {
        return data;
    }
};

export const login = async (user: { email: string; password: string }): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/account/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!data || res.status !== 200) {
        return {
            error: "Error logging out.",
        };
    } else {
        return data;
    }
};

export const logout = async (): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account/logout`, {
        method: "POST",
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error logging out.",
        };
    }
    return data;
};

export const update = async (user: {
    user: {
        email: string;
        username: string;
        oldpassword: string;
        newpassword: string;
        confirmpassword: string;
        about: string;
        password: string;
    };
}): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/account`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
    });
    const data = await res.json();
    if (!data || res.status !== 200) {
        return {
            error: "Error updating user.",
        };
    } else {
        return data;
    }
};

export const deleteAccount = async (): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account`, {
        method: "DELETE",
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Deleting Account.",
        };
    }
    return data;
};

export const subscribe = async (subscribe: { subscription: string }): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscribe),
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Subscribing.",
        };
    }
    return data;
};

export const unsubscribe = async (subscribe: { subscription: string }): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/account/unsubscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscribe),
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Unsubscribing.",
        };
    }
    return data;
};

export const sendIdAndToken = async (
    route: string,
    payload: { id: string; token: string; password?: string }
): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/account/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data) {
        return {
            error: "Request to backend failed.",
        };
    } else {
        return data;
    }
};

export const sendEmail = async (route: string, email: string): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/account/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!data) {
        return {
            error: "Request to backend failed.",
        };
    } else {
        return data;
    }
};

export const getComic = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/comicAuthor/` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await result.json();
};

export const createComic = async (): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/comic`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await res.json();
    if (!data || res.status !== 200) {
        return {
            error: "Error creating comic.",
        };
    }
    return data;
};

export const getUserProfilePicture = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/image/` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await result.json();
};

export const getImage = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/image/` + id, {
        method: "GET",
        credentials: "include",
    });
    const data = await result.json();
    if (!data) {
        return {
            error: "Request to backend failed.",
        };
    } else {
        return data;
    }
};

export const createImage = async (image: FormData): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/image`, {
        method: "POST",
        body: image,
        credentials: "include",
    });
    const { data, error } = await result.json();
    if (error) return { error };
    else return data;
};

export const getStory = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/story/` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await result.json();
};

export const deleteComic = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/` + id, {
        method: "DELETE",
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Deleting Comic.",
        };
    }
    return data;
};

export const deleteStory = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/story/` + id, {
        method: "DELETE",
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Deleting Story.",
        };
    }
    return data;
};

export const publishComic = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/publish/` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error publishing comic.",
        };
    } else {
        return data;
    }
};

export const unpublishComic = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/unpublish/` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error unpublishing comic.",
        };
    } else {
        return data;
    }
};

export const publishStory = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/story/publish/` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error publishing story.",
        };
    } else {
        return data;
    }
};

export const unpublishStory = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/story/unpublish/` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error unpublishing story.",
        };
    } else {
        return data;
    }
};
