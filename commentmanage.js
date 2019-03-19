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
      console.log("The comment created");
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

  editComment(commentId, message) {
    this.connectToDataBase();
    const sql = `UPDATE comment SET message = '${message}' WHERE comment_id = ${commentId} AND author = ${this.myId}`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("The comment edited");
    });
    this.closeConnection();
  }

  deleteComment(commentId) {
    this.connectToDataBase();
    const sql = `DELETE FROM comment WHERE comment_id = ${commentId} AND author = ${this.myId}`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("The comment deleted");
    });
    this.closeConnection();
  }

  getAllComments() {
    this.connectToDataBase();
    const sql = `SELECT * FROM comment WHERE author = ${this.myId}`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
      result.forEach(comment => {
        console.log(comment.message);
      });
    });
    this.closeConnection();
  }
}

class moderator extends User {
  constructor(id) {
    super(id);
  }
  deleteComment(commentId) {
    this.connectToDataBase();
    const sql = `DELETE FROM comment WHERE comment_id = ${commentId}`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("The comment deleted");
    });
    this.closeConnection();
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

  editComment(commentId, message) {
    this.connectToDataBase();
    const sql = `UPDATE comment SET message = '${message}' WHERE comment_id = ${commentId}`;
    this.connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("The comment edited");
    });
    this.closeConnection();
  }

}
const user = new User(3);
user.getAllComments();
const admin = new Admin(3);
//admin.editComment(2, "This is edited by the admin!");
admin.deleteComment(2);
//user.editComment(3, "This is edited!");
//user.deleteComment(3);
//admin.createComment("As an admin I can confirmm that");
//user.createComment("Another comment after a deletion");
//user.createReply(3, "I love him too, He is great forever");