import type { NextApiRequest, NextApiResponse } from "next";
import { logout } from "../../util/zilean";

type Data = {
    data?: Record<any, any>;
    error?: string;
};

// Used as a testing route for logging out without using UI
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const data = await logout(req.headers.cookie || "");
    if (data.error) {
        res.status(400).json({ error: data.error });
    } else {
        res.status(200).json({ data });
    }
}
