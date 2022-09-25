import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../../../services/user";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const name = req.query.name.toString();

    // Errors managment
    if (name) {
        try {
            // Database query
            const users = await getUsers(name);

            if (users) {
                res.status(200);
                res.json(users);
            }

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to fetch users with string: " + name.toString() });
            console.log(e);

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}