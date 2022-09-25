import { NextApiRequest, NextApiResponse } from "next";
import { getJobs } from "../../../services/jobs";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Comprobation of the method
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Errors managment
    try {
        // Calling service to get all the job offers
        const jobOffers = await getJobs();

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