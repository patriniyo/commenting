const mysql = require('mysql');

class User {
  constructor(id) {
    this.myId = id;
    this.loggedIn = false;
    this.lastLoggedInAt = null;
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "commenting_roles",
      password: ""
    });
  }
  logIn() {
    this.lastLoggedInAt = new Date();
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false
  }
  connectToDataBase() {
    this.connection.connect();
  }
  closeConnection() {
    this.connection.end();
  }
  createComment(author, message) {

  }

  createReply(parent, message) {

  }

  /*testUser(id) {
    if (this.isNormalUser(id)) {
      console.log("this is a normal user");
    } else {
      console.log("He is a normal user");
    }
  }*/

  isNormalUser(id) {
    this.connectToDataBase();
    const sql = `SELECT role FROM users WHERE users.user_id = ${id}`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result[0].role === 1) {
        return true;
      } else {
        return false;
      }
      //console.log(result);
    });
    this.closeConnection();
  }
}
class moderator extends User {
  constructor() {
    super();
  }

}
class admin extends moderator {
  constructor() {
    super();
  }
  createUser(name, role) {
    this.connectToDataBase();
    const sql = `INSERT INTO users (name, role) VALUES ('${name}',${role})`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
    });
    this.closeConnection();
  }

}
const user = new User(2);