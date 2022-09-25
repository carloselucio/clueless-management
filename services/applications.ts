import prisma from "../lib/prisma";

export async function getUserApplications(user_id){

    // Database query
    const applications = await prisma.application.findMany({
        where: {
            user_id: user_id,
        },
        select: {
            application_id: true,
            job_id: true,
            date: true,
            status: true,
            jobOffer: {
                select: {
                    position: true
                }
            }
        }
    });

    return applications

}

export async function createApplication(user_id, job_id){

    // Database query
    const application = await prisma.application.create({
        data: {
            user_id: user_id,
            job_id: job_id,
        }
    });

    return application
}

export async function deleteApplication(application_id){

    // Database query
    const deleted_experience = await prisma.application.delete({
        where: {
            application_id: application_id,
        },
    });
    
    return deleted_experience

}

export async function updateStatus(application_id, status){

    // Database query
    const jobOffer = await prisma.application.update({
        where: {
            application_id: application_id
        },
        data: {
            status: status
        }
    });
    
    return jobOffer
}