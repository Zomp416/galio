import { IStory } from "../context/storycontext/model";
export const zileanOrigin = process.env.NEXT_PUBLIC_ZILEAN_ORIGIN || "http://localhost:3001";

interface ZileanResponse {
    data?: any;
    error?: string;
}

export const createStory = async (): Promise<ZileanResponse> => {
    const res = await fetch(`${zileanOrigin}/story`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data = await res.json();
    if (!data || res.status !== 200) {
        return {
            error: "Error creating story.",
        };
    }
    return data;
};

export const getStory = async (id: string): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/story/` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return result.json();
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
export const saveStory = async (story: IStory): Promise<ZileanResponse> => {
    const result = await fetch(`${zileanOrigin}/story/${story._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ story }),
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        return {
            error: "Error Updating Story.",
        };
    }
    return data;
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
