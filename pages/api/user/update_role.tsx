import { NextApiRequest, NextApiResponse } from "next";
import { updateRole } from "../../../services/user";
import { getSession } from "next-auth/react";
import SessionDTO from "../../../lib/dto/session";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Getting the information of the user session
    const session = new SessionDTO(await getSession({ req }));

    // Checking for the existence of a Master session
    if (!session || session.role != "MASTER") {
        return res.status(401).json({ error: "Authorization Required" });
    }

    // Comprobation of the method
    if (req.method !== "PUT"){
        return res.status(405).json({ error: "Method not allowed" });
    }
    
    const { user_id, role} = req.body;

    // Erros managment
    if (user_id && role) {
        try {
            // Database query
            const updated_user = await updateRole(user_id, role);
            
            res.status(200);
            res.json(updated_user);    

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to update role for user with user_id: " + user_id.toString() });
            console.log(e);

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}