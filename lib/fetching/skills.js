export async function getSkills(){
    try {
        const res = await fetch(process.env.APP_DOMAIN +'/api/skills/get_all', {
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'GET',
        })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}