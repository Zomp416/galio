// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    data?: Record<any, any>;
    msg?: string;
};

// Used as a testing route to check if a session cookie exists
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const result = await fetch(`http://localhost:3001/test-check`, {
        method: "GET",
        headers: {
            cookie: req.headers.cookie || "",
        },
    });
    const data = await result.json();
    if (!data || result.status !== 200) {
        res.status(200).json({ msg: "Not Logged In!" });
    }

    res.status(200).json({ data, msg: req.headers.cookie });
}
