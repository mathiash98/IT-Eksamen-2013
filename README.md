# IT-Eksamen-2013
A git for practicing for IT (Information Technology) exams


You can see the task for the exam in task.pdf

You will need to add a conf file under config in root like this, where dbUrl is the link to your mongodb db
```
console.log('Hello from conf.js');
module.exports = {
  dbUrl : 'mongodb://localhost/fotball',
  secret: 'YourSecretForHashing'
};
```

Then run:
```
npm install
node index
```
```
Go to localhost:8080 to test it
```
