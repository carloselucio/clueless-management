export async function getDashboard(user_id) {
    try {
      const res = await fetch(process.env.APP_DOMAIN + '/api/dashboard/get/' + user_id, {
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

export async function createSkill(data) {
  try {
    const res = await fetch('/api/dashboard/create_skill', {
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

export async function deleteSkill(data) {
  try {
    const res = await fetch('/api/dashboard/delete_skill', {
        body: JSON.stringify(data),
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

export async function createLink(data) {
  try {
    const res = await fetch('/api/dashboard/create_link', {
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

export async function deleteLink(data) {
  try {
    const res = await fetch('/api/dashboard/delete_link', {
        body: JSON.stringify(data),
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

export async function updateAbout(formData) {
  try {
    const res = await fetch('/api/dashboard/update_about', {
        body: formData,
        method: 'PUT',
    })

    return res;

  } catch (error) {
      throw new Error(error)
  }
}

export async function updateLocation(data) {
  try {
    const res = await fetch('/api/dashboard/update_location', {
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

export async function updateAvailability(data) {
  try {
    const res = await fetch('/api/dashboard/update_availability', {
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