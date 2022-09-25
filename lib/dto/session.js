export default class SessionDTO{
    constructor(session) {
        this.id = session.user.id
        this.name = session.user.name
        this.occupation = session.user.occupation
        this.image = session.user.image
        this.role = session.user.role
    }
}