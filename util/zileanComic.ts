import { IComic } from "../context/comiccontext/model";
export const zileanOrigin = process.env.NEXT_PUBLIC_ZILEAN_ORIGIN || "http://localhost:3001";

interface ZileanResponse {
    data?: any;
    error?: string;
}

export const viewComic = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/view/${id}`, {
        method: "GET",
    });
    return await result.json();
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

export const getEditComic = async (cookie: string, id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
        },
        credentials: "include",
    });
    return await result.json();
};

export const searchComic = async (params: {
    value?: string;
    time?: string;
    sort?: string;
    page?: number;
    limit?: number;
}): Promise<ZileanResponse> => {
    let query = `${zileanOrigin}/comic/search?`;
    if (params.value) query += `value=${params.value}&`;
    if (params.time) query += `time=${params.time}&`;
    if (params.sort) query += `sort=${params.sort}&`;
    if (params.page) query += `page=${params.page}&`;
    if (params.limit) query += `limit=${params.limit}&`;

    const result = await fetch(query);
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
export const saveComic = async (comic: IComic): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/${comic._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ comic }),
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Updating Comic.",
        };
    }
    return data;
};
export const publishComic = async (
    id: string,
    renderedImage?: Record<any, any>
): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/publish/` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ renderedImage }),
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

export const rateComic = async (comicID: string, rating: number): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/rate/${comicID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
        credentials: "include",
    });
    const data = await result.json();
    if (!data) {
        return {
            error: "Error rating comic.",
        };
    } else {
        return data;
    }
};

export const commentComic = async (comicID: string, text: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/comic/comment/${comicID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        credentials: "include",
    });
    const data = await result.json();
    if (!data) {
        return {
            error: "Error commenting on comic.",
        };
    } else {
        return data;
    }
};
