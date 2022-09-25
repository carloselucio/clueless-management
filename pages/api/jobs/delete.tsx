import { NextApiRequest, NextApiResponse } from "next";
import { deleteJob } from "../../../services/jobs";
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
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { job_id } = req.body;

    // Errors managment
    if (job_id) {
        try {
            // Calling service to delete a job
            const deleted_job = await deleteJob(job_id);

            res.status(200);
            res.json(deleted_job);

        } catch (e) {
            res.status(500);
            res.json({ error: "Unable to delete jobOffer with job_id: " + job_id.toString() });
            console.log(e);

        }
    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}