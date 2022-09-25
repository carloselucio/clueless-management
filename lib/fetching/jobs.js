export async function getJobs(){
    try {
        const res = await fetch(process.env.APP_DOMAIN +'/api/jobs/get_all', {
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

export async function getJobsWithApplications(cookie){
    try {
        const res = await fetch(process.env.APP_DOMAIN +'/api/jobs/get_all_with_applications', {
            headers: {
                Cookie: cookie,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}

export async function getApplications(user_id, cookie){
    try {
        const res = await fetch(process.env.APP_DOMAIN + '/api/applications/get/' + user_id, {
            method: 'GET',
            headers: new Headers({
                Cookie: cookie,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
          })

        return res;

    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteApplication(user_id, application_id){
    try {
        const res = await fetch('/api/applications/delete', {
            body: JSON.stringify({user_id: user_id, application_id: application_id}),
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

export async function createApplication(data){
    try {
        const res = await fetch('/api/applications/create', {
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

export async function deleteJob(job_id){
    try {
        const res = await fetch('/api/jobs/delete', {
            body: JSON.stringify({job_id: job_id}),
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

export async function createJob(data){
    try {
        const res = await fetch('/api/jobs/create', {
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

export async function updateJob(data){  
    try {
        const res = await fetch('/api/jobs/update', {
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

export async function updateApplicationStatus(application_id, status){  
    try {
        const res = await fetch('/api/applications/update_status', {
            body: JSON.stringify({application_id: application_id, status: status}),
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