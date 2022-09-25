import { NextApiRequest, NextApiResponse } from "next";
import { getUserApplications } from "../../../../services/applications";
import { getSession } from "next-auth/react";
import SessionDTO from "../../../../lib/dto/session";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    
    // Getting the information of the user session
    const session = new SessionDTO(await getSession({ req }));

    // Checking for the existence of a session
    if (!session) {
        return res.status(401).json({ error: "Authorization Required" });
    }
    
    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const user_id = req.query.user_id.toString();

    // Error managment
    if (user_id) {

        // Checking if the user_id sented corresponds to the session
        if (session.id != user_id){
            return res.status(401).json({ error: "Session id mismatch" });
        }

        try {
            // Calling service to get user applications
            const applications = await getUserApplications(user_id);

            if (applications) {
                res.status(200);
                res.json(applications);
            } else {
                res.status(404).json({ error: "User with user_id: " + user_id.toString() + " not found" });
            }

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to fetch job applications from user with user_id: " + user_id.toString() });

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}