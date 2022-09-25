export async function getUserByName(name){
  try {
      const res = await fetch('/api/user/get/' + name, {
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

export async function updateRole(data) {
  try {
    const res = await fetch('/api/user/update_role', {
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