import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from 'formidable'
import { updateAbout, updateAboutNoImage } from "../../../services/dashboard";
import { promises as fs } from "fs";
import path from "path";
import { getSession } from "next-auth/react";
import SessionDTO from "../../../lib/dto/session";

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {

    // Getting the information of the user session
    const session = new SessionDTO(await getSession({ req }));

    // Checking for the existence of a session
    if (!session) {
        return res.status(401).json({ error: "Authorization Required" });
    }

    // Comprobation of the method
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const data: { err, fields, files } = await new Promise((resolve, reject) => {
        const form = formidable({})

        form.parse(req, (err, fields, files) => {
            if (err) reject({ err })
            resolve({ err, fields, files })
        })
    })

    let { user_id, name, occupation, bio } = await data.fields
    const { imageSrc } = await data.files


    // Errors managment
    if (user_id && name) {
        if (occupation == "") occupation = null
        if (bio == "") bio = null

        // Checking if the user_id sented corresponds to the session
        if (session.id != user_id) {
            return res.status(401).json({ error: "Session id mismatch" });
        }

        // Process when the user uploads an image
        if (imageSrc) {

            // Check directory for uploads
            const targetPath = path.join(process.cwd(), `/public/images/u/`);
            try {
                await fs.access(targetPath);
            } catch (e) {
                await fs.mkdir(targetPath);
            }

            const tempPath = imageSrc.filepath;
            await fs.rename(tempPath, targetPath + user_id + ".png").then(async () => {

                try {
                    // Calling service to update about
                    const updated_user = await updateAbout(user_id, name, occupation, bio);

                    res.status(200);
                    res.json(updated_user)

                } catch (e) {
                    res.status(500);
                    res.json({ error: "Unable to update about section for user with the user_id: " + user_id.toString() });
                    console.log(e);
                }
            })

        } else {

            // Process when the user does not upload an image
            try {
                // Database query
                const updated_user = await updateAboutNoImage(user_id, name, occupation, bio);

                res.status(200);
                res.json(updated_user)

            } catch (e) {
                res.status(500);
                res.json({ error: "Unable to update about section for user with the user_id: " + user_id.toString() });
                console.log(e);
            }
        }

    } else {
        res.status(400).json({ error: "Server did not understand the request due to invalid syntax" });
    }
}