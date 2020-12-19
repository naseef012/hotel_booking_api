# Node JS RESTful Service for Hotel Booking

## I used an open source template of Node JS express with MySQL connection for this Project. All the Assessment related works are done by me. You can find the list of past contributors of this Project in the contributor list. The works done by me are displayed by my commits. 

# Please find the MySQL Dump of the Database in `db_file_dump` folder

# Please find below the link of POSTMAN API Doc link

https://www.getpostman.com/collections/9f3d8dda1ac2f49843e0

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
* To Know more about bcrypt [check here](https://www.npmjs.com/package/bcrypt)

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
3. other crud route are in secureApi -  `localhost:9890/secureApi/book`, `localhost:9890/secureApi/customer`, `localhost:9890/secureApi/checkin`, `localhost:9890/secureApi/checkout`
     * In all GET and POST request pass `token` in header which you get in login response.

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
    "customerId": 5,
    "roomNumber": "401",
    "arrivalTime": "2021-04-01 08:00:00",
    "checkoutTime": "2021-04-02 06:00:00",
    "paymentAmount": 3000,
    "maxPersons": 5
}

```
Note: You have to pass `token` for each request as header which youi will get in login response.

# Features

* To perform basic operation all `Create`, `Fetch`, `Delete` and `Update` functionality.
* Used Express framework to obtain required operations.
* Used Express router to route endpoint path.
* Used JWT Web Token for security and authentication of API.
* MVC structure in which `Route`, `Service` and `Model` layer.
* Used AJV as schema validator which validate request and response schema.
* Used Connection Pooling which lead to reduce number of conncetion at any point of time and reduce stress in DB which leads to better availability and Performance of DB.
* `bcrypt` is used to encrypt your password through salt and hashing technique and which won't store password as plain text in database.





