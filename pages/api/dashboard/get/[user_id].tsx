import { NextApiRequest, NextApiResponse } from "next";
import { getDashboard } from "../../../../services/dashboard";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Obtaining variables from request
    const user_id = req.query.user_id.toString();

    // Error managment
    if (user_id) {
        try {
            // Calling service to get the user dashboard
            const dashboard = await getDashboard(user_id);

            if (dashboard) {
                res.status(200);
                res.json(dashboard);
            } else {
                res.status(404).json({ error: "User with user_id: " + user_id.toString() + " not found" });
            }

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to fetch the dashboard from user with user_id: " + user_id.toString() });

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}