import { NextApiRequest, NextApiResponse } from "next";
import { getSkills } from "../../../services/skills";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Errors managment
    try {

        // Calling service to get all the skills from the database
        const skills = await getSkills();

        if (skills) {
            res.status(200);
            res.json(skills);

        } else {
            res.status(404).json({ error: "Not found skills" });
        }

    } catch (e) {
        res.status(500);
        res.json({ error: "Unable to fetch skills" });
        console.log(e);

    }
}