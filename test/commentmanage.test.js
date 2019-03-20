const User = require('../commentmanage');
const chai = require('chai');

chai.should();

const user = new User(1);
const sum = user.addNumbers(1, 2);
describe('Testing Database Queries', () => {
  describe('Testing Add method', () => {
    it('Should add two numbers', () => {
      sum.should.equal(3);
    });
  });
  describe('Testing Creatin a Comment', () => {
    it('Should Create a comment', (done) => {
      user.createComment('Testing a comment insertion').then((result) => {
        result.affectedRows.should.equal(1);
        done();
      });
    });
  });
});
