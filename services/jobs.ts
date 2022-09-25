import prisma from "../lib/prisma";

export async function createJob(position, start_date, end_date, description, contract, location, skills){

    // Database query
    const jobOffer = await prisma.jobOffer.create({
        data: {
            position: position,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            description: description,
            contract: contract,
            location: location,
            jobOffer_skills: {
                createMany: {
                    data: skills
                }
            }
        }
    });

    return jobOffer;

}

export async function deleteJob(job_id){

    // Database query
    const deleted_job = await prisma.jobOffer.delete({
        where: {
            job_id: job_id,
        },
    });

    return deleted_job;

}

export async function getJobsAndApplications(){

    // Database query
    const jobOffers = await prisma.jobOffer.findMany({
        include: {
            jobOffer_skills: {
                select: {
                    skill: {
                        select: {
                            skill_id: true,
                            name: true
                        }
                    }
                }
            },
            applications: {
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true,
                            dashboard: {
                                select: {
                                    dashboard_skills: {
                                        select: {
                                            skill: {
                                                select: {
                                                    name: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return jobOffers;

}

export async function getJobs(){

    // Database query
    const jobOffers = await prisma.jobOffer.findMany({
        include: {
            jobOffer_skills: {
                select: {
                    skill: {
                        select: {
                            skill_id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    return jobOffers;

}

export async function updateJob(job_id, position, start_date, end_date, description, contract, location, skills){

    // Database query
    const jobOffer = await prisma.jobOffer.update({
        where: {
            job_id: job_id
        },
        data: {
            position: position,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            description: description,
            contract: contract,
            location: location,
            jobOffer_skills: {
                deleteMany: {},
                createMany: {
                    data: skills,
                    skipDuplicates: true
                }
            }
        }
    });

    return jobOffer;

}