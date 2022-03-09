import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromSession } from "../../util/zilean";

type Data = {
    data?: Record<any, any>;
    error?: string;
};

// Used as a testing route to check if a session cookie exists
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const result = await getUserFromSession(req.headers.cookie || "");
    let statusCode = 200;
    if (!result || result.error) {
        statusCode = 401;
    }
    res.status(statusCode).json(result);
}
