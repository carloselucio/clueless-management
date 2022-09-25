import prisma from "../lib/prisma";

export async function getDashboard(user_id){

    // Database query
    const dashboard = await prisma.user.findUnique({
        where: {
            id: user_id,
        },
        select: {
            id: true,
            image: true,
            name: true,
            occupation: true,
            experiences: {
                take: 1,
                where: {
                    type: "PERSONAL_PROJECT",
                },
                orderBy: {
                    end_date: "desc",
                },
                select: {
                    name: true,
                    description: true,
                    start_date: true,
                    end_date: true,
                }
            },
            dashboard: {
                select: {
                    dashboard_id: true,
                    bio: true,
                    time_zone: true,
                    location: true,
                    latitude: true,
                    longitude: true,
                    availability: true,
                    level: true,
                    socialLinks: {
                        select: {
                            social_id: true,
                            url: true,
                        }
                    },
                    dashboard_skills: {
                        select: {
                            dashboard_skill_id: true,
                            level: true,
                            skill: {
                                select: {
                                    name: true,
                                }
                            },
                        },
                        orderBy: {
                            level: "desc",
                        }
                    }
                },
            },
        }
    });

    return dashboard;
}

export async function createLink(dashboard_id, url){

    // Database query
    const link = await prisma.socialLinks.create({
        data: {
            dashboard_id: dashboard_id,
            url: url
        },

    });

    return link;
}

export async function createSkill(dashboard_id, skill_id, level){

    // Database query
    const dashboard_skill = await prisma.dashboard_Skill.create({
        data: {
            dashboard_id: dashboard_id,
            skill_id: skill_id,
            level: level
        }
    });

    return dashboard_skill;
}

export async function deleteLink(social_id){

    // Database query
    const deleted_link = await prisma.socialLinks.delete({
        where: {
            social_id: social_id
        },
    });

    return deleted_link;
}

export async function deleteSkill(dashboard_skill_id){

    // Database query
    const deleted_dashboard_skill = await prisma.dashboard_Skill.delete({
        where: {
            dashboard_skill_id: dashboard_skill_id
        }
    });

    return deleted_dashboard_skill;
}

export async function updateAbout(user_id, name, occupation, bio){

    // Database query
    const updated_user = await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            image: process.env.APP_DOMAIN + "/images/u/" + user_id + ".png",
            name: name,
            occupation: occupation,
            dashboard: {
                update: {
                    bio: bio,
                }
            }
        },
        include: {
            dashboard: true,
        }
    });

    return updated_user; 
}

export async function updateAboutNoImage(user_id, name, occupation, bio){

    // Database query
    const updated_user = await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            name: name,
            occupation: occupation,
            dashboard: {
                update: {
                    bio: bio,
                }
            }
        },
        include: {
            dashboard: true,
        }
    });

    return updated_user;
}

export async function updateAvailability(user_id, availability){

    // Database query
    const updated_dashboard = await prisma.dashboard.update({
        where: {
            user_id: user_id,
        },
        data: {
            availability: new Date(availability)
        }
    });

    return updated_dashboard;
}

export async function updateLocation(user_id, time_zone, location, latitude, longitude){

    // Database query
    const updated_dashboard = await prisma.dashboard.update({
        where: {
            user_id: user_id,
        },
        data: {
            time_zone: time_zone,
            location: location,
            latitude: latitude,
            longitude: longitude
        }
    });

    return updated_dashboard;
}