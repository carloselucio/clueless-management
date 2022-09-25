import { NextApiRequest, NextApiResponse } from "next";
import { getUserExperiences } from "../../../../services/experience";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const user_id = req.query.user_id.toString();

    // Errors managment
    if (user_id) {
        try {
            // Calling service to get user experiences
            const experiences = await getUserExperiences(user_id)

            if (experiences) {
                res.status(200);
                res.json(experiences);
            }

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to fetch the experiences from user with user_id: " + user_id.toString() });
            console.log(e);

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}