import { NextApiRequest, NextApiResponse } from "next";
import { deleteLink } from "../../../services/dashboard";
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
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { user_id, social_id } = req.body;

    // Error managment
    if (user_id && social_id) {

        // Checking if the user_id sented corresponds to the session
        if (session.id != user_id) {
            return res.status(401).json({ error: "Session id mismatch" });
        }

        try {
            // Calling service to delete a link
            const deleted_link = await deleteLink(social_id);

            res.status(200);
            res.json(deleted_link);

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to delete link with social_id: " + social_id.toString() });
            console.log(e);

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}