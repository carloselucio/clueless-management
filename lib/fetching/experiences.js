export async function createExperience(data){
    try {
        const res = await fetch('/api/experience/create', {
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}

export async function getExperiences(user_id){
    try {
        const res = await fetch(process.env.APP_DOMAIN + '/api/experience/get/' + user_id, {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              Accept: 'application/json',
            }),
          })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}

export async function updateExperience(data){  
    try {
        const res = await fetch('/api/experience/update', {
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'PUT',
        })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteExperience(user_id, experience_id){
    try {
        const res = await fetch('/api/experience/delete', {
            body: JSON.stringify({user_id: user_id, experience_id: experience_id}),
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'DELETE',
        })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}