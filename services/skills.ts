import prisma from "../lib/prisma";

export async function createSkill(name){

    // Database query
    const skill = await prisma.skill.create({
        data: {
            name: name
        }
    });

    return skill;

}

export async function getSkills(){

    // Database query
    const skills = await prisma.skill.findMany();

    return skills;

}