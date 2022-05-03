export const zileanOrigin = process.env.NEXT_PUBLIC_ZILEAN_ORIGIN || "http://localhost:3001";

interface ZileanResponse {
    data?: any;
    error?: string;
}

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
    return await result.json();
};

export const searchImage = async (query: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/image/search?value=${query}`, {
        method: "GET",
        credentials: "include",
    });
    return result.json();
};
