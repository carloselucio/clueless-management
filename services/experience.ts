import prisma from "../lib/prisma";

export async function createExperience(user_id, type, description, name, start_date, end_date){

    // Database query
    const { experiences } = await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            experiences: {
                create: [
                    {
                        type: type,
                        description: description,
                        name: name,
                        start_date: new Date(start_date),
                        end_date: new Date(end_date),
                    },
                ],
            },
        },
        select: {
            experiences: true,
        },
    });

    return experiences

}

export async function deleteExperience(experience_id){

    // Database query
    const deleted_experience = await prisma.experience.delete({
        where: {
            experience_id: experience_id,
        },
    });

    return deleted_experience

}

export async function updateExperience(experience_id, type, description, name, start_date, end_date){

    // Database query
    const updated_experience = await prisma.experience.update({
        where: {
            experience_id: experience_id,
        },
        data: {
            type: type,
            description: description,
            name: name,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        }
    });

    return updated_experience
}

export async function getUserExperiences(user_id){

    // Database query
    const experiences = await prisma.user.findUnique({
        where: {
            id: user_id,
        },
        select: {
            id: true,
            image: true,
            name: true,
            occupation: true,
            experiences: true,
        }
    });

    return experiences

}