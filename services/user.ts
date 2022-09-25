import prisma from "../lib/prisma";

export async function getUsers(name){

    // Database query
    const users = await prisma.user.findMany({
        take: 5,
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
        },
        select: {
            id: true,
            image: true,
            name: true,
            occupation: true,
            role: true,
        },
        orderBy: {
            name: 'desc',
        },
    });

    return users;
}

export async function updateRole(user_id, role){

    // Database query
    const updated_user = await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            role: role
        }
    });

    return updated_user;
}