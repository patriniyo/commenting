const mysql = require('mysql');
const moment = require('moment');
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
    this.lastLoggedInAt = moment().format('YYYY-MM-DD HH:mm:ss');
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
  createComment(message) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    this.connectToDataBase();
    const sql = `INSERT INTO comment (author, timestamp, message) VALUES (${this.myId},'${timestamp}','${message}')`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
    });
    this.closeConnection();
  }

  createReply(parent, message) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    this.connectToDataBase();
    const sql = `INSERT INTO reply (parent_id, timestamp, message) VALUES (${parent}, '${timestamp}','${message}')`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
    });
    this.closeConnection();
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
  constructor(id) {
    super(id);
  }

}
class Admin extends moderator {
  constructor(id) {
    super(id);
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
const user = new User(5);
const admin = new Admin(3);
admin.createComment("As an admin I can confirmm that");
//user.createComment("The moment js is a great tool ever");
user.createReply(3, "I love him too, He is great forever");