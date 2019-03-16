import mysql from 'mysql';

class user {
  constructor() {
    this.loggedIn = false;
    this.lastLoggedInAt = null;
  }
  logIn() {
    this.lastLoggedInAt = new Date();
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false
  }
  connectToDataBase() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "commenting_roles",
      password: ""
    });
  }
}
class moderator extends user {
  constructor() {
    super();
  }

}
class admin extends moderator {
  constructor() {
    super();
  }

}