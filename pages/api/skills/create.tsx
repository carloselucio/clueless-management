import { NextApiRequest, NextApiResponse } from "next";
import { createSkill } from "../../../services/skills";
import { getSession } from "next-auth/react";
import SessionDTO from "../../../lib/dto/session";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Getting the information of the user session
    const session = new SessionDTO(await getSession({ req }));

    // Checking for the existence of a Master or Admin session
    if (!session || session.role == "USER") {
        return res.status(401).json({ error: "Authorization Required" });
    }

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name } = req.body;

    // Errors managment
    if (name) {
        try {
            // Calling service to create an skill
            const skill = await createSkill(name);

            res.status(200);
            res.json(skill);

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to create the skill" });
            console.log(e);

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}