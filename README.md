# Node JS RESTful Service for Hotel Booking



# PreRequisite

* xampp/lampp/wampp application to run MySQL database and Apache server [Download from here](https://www.apachefriends.org/download.html).
* Download Node js and install in your operating system. [Download from here](https://nodejs.org/en/download/)
* Postman a desktop app or you can use it [chrome extension](https://chrome.google.com/webstore/category/extensions) for API testing.[Download from here](https://www.getpostman.com/apps) 

# Used Packages 

### 1. MYSQL
```
 npm install mysql 
```
* Used to get mysql function and modules to perform DB operation  [know more about package](https://www.npmjs.com/package/mysql)
* To Know more about MySQL built in functions [check here](https://www.github.com/mysqljs/mysql)

---

### 2. Express
```
npm install express 
```
* Platform it built over it [know more about express](https://www.npmjs.com/package/express)
* To Know more about Express built in functions [check here](http://expressjs.com/en/starter/installing.html)

---

### 3. Ajv
```
npm install ajv 
```
* ajv used for validation of schema [know more about ajv](https://www.npmjs.com/package/ajv)
* To Know more about ajv built in functions [check here](https://www.npmjs.com/package/ajv)

---

### 4. JWT
```
npm install jsonwebtoken 
```
* jsonwebtoken is used for authentication of api through Token [know more about jwt](https://www.npmjs.com/package/jsonwebtoken)
* To Know more about jwt built in functions [check here](https://jwt.io/)

---

### 5. bcrypt
```
npm install bcrypt  
```
* bcrypt will encrypt your password throughing hashing so your password won't store as plain text .[know more about bcrypt](https://www.npmjs.com/package/bcrypt)
* To Know more about nodemailer [check here](https://www.npmjs.com/package/bcrypt)

---

# Table Creation In DB

SQL File is in the project directory.

# Get Started

1. `$ git clone https://github.com/naseef012/hotel_booking_api.git`
2. `$ npm install`
4. `$ node app.js`
3. Launch Enviornment:
    * `$ node app.js or nodemon app.js`



# API Usage 

1. signup route - `http://localhost:9890/api/signup`
     * pass json object contain username and password.
2. login route - `http://localhost:9890/api/login`
     * pass json object contain username and password.
3. other crud route are in secureApi -  `localhost:9890/secureApi/user`.
     * In all GET, PUT, DELETE and POST request pass `token` in header which you get in login response.

Example object for login request (body as JSON object) -

```
{
    "username":"test",
    "password":"testpass"
}
```
For Other Crud request - 

```
{
   "name":"username",
   "age:11,
   "state":"statename",
   "country":"countryname"
}

```
Note: You have to pass `token` for each request as header which youi will get in login response.

# Features

* To perform basic operation all `Create`, `Fetch`, `Delete` and `Update` functionality.
* Used Express framework to obtain required operations.
* Used Express router to route endpoint path.
* Used JWT Token for security and authentication of API.
* MVC structure in which `Route`, `Service` and `Model` layer.
* Used AJV as schema validator which validate request and response schema.
* Used Connection Pooling which lead to reduce number of conncetion at any point of time and reduce stress in DB which leads to better availability and Performance of DB.
* Used common error structure format for all type of error throwing in Application.
* Includes `documents` folder which contain swagger representation both in JSON and HTML, which will help front-end developer for better understanding.
* `Pm2` a process manager which help to watch, reload, restart and monitor with load balancer in each and every activity.
* `nodemailer` is used to send mail over SMTP. as for i now used for sending mail if error comes.
* `bcrypt` is used to encrypt your password through salt and hashing technique and which won't store password as plain text in database.
* `artillery` is used to perform load testing which will check sustainibility of your API at `high traffic`.

# Swagger Related task

1. How to Open Swagger - 
    * [open](http://editor.swagger.io) 
2. Go to `File` and `import file` option, import `JSON` file present in `document` folder.
3. To Download `HTML` file of particular `JSON` 
   * Go to `Generate Client` option and `html2` option it will download html file.
4. Know more about Swagger [Check here](https://swagger.io/docs/)

---

# Artillery Run 

1. First go to `/loadtest` folder
2. you can use artillery in 2 way :-
   * by hardcoding data in yml file.
   * getting data by `.csv` file.
3. For option 1 run - `artillery run hello.yml`
4. For option 2 first get CSV file with data.
5. define path in yml file and run example as i Did :- `artillery run hellocsv.yml`        





