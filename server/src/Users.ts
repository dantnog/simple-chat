export default class Users {
  static users: any = {}

  static setUser(id: string, nick: string, room: string) {
    this.users[id] = {nick, room}
  }

  static getUser(id: string) {
    return this.users[id] || null
  }

  static deleteUser(id: string) {
    delete this.users[id]
  }
}