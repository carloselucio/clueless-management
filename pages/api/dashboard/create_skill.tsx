import { NextApiRequest, NextApiResponse } from "next";
import { createSkill } from "../../../services/dashboard";
import { getSession } from "next-auth/react";
import SessionDTO from "../../../lib/dto/session";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Getting the information of the user session
    const session = new SessionDTO(await getSession({ req }));

    // Checking for the existence of a session
    if (!session) {
        return res.status(401).json({ error: "Authorization Required" });
    }

    // Comprobation of the method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { user_id, dashboard_id, skill_id, level } = req.body;

    // Error managment
    if (user_id && dashboard_id && skill_id && level) {

        // Checking if the user_id sented corresponds to the session
        if (session.id != user_id) {
            return res.status(401).json({ error: "Session id mismatch" });
        }

        try {
            // Calling service to create skill
            const dashboard_skill = await createSkill(dashboard_id, skill_id, level)

            res.status(200);
            res.json(dashboard_skill);

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to create dashboard_skill for user with dashboard_id: " + dashboard_id.toString() });
            console.log(e);
        }

    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}