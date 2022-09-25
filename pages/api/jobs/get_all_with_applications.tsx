import { NextApiRequest, NextApiResponse } from "next";
import { getJobsAndApplications } from "../../../services/jobs";
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
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Errors managment
    try {
        // Calling service to get all the job offers and their respective applications
        const jobOffers = await getJobsAndApplications();

        if (jobOffers) {
            res.status(200);
            res.json(jobOffers);

        } else {
            res.status(404).json({ error: "Job offers not found" });
        }

    } catch (e) {
        res.status(500);
        res.json({ error: "Unable to fetch the job offers" });
        console.log(e);

    }

}