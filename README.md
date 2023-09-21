# Todo API

A RESTful API using NodeJS leveraging ExpressJS and postgreSQL


## Features

- Passwordless login and signup for easy access
- CreateReadUpdateDelete(CRUD) operations of todos
- fully-fledged search, filter, and sort functionality
- Pagination with user defined page and pageSize
- jwt authorization

## Technologies Used

- NodeJS leveraging ExpressJS
- TypeScript for type checking
- PostgreSQL to store the data
- BodyValidation middleware


## Install

Clone project.
Run the following line of code in your terminal to install all the needed packages: 
```
npm i
```
Once all the packages have been installed, open terminal and run the following code in command line : 
```
npm run build
```
Set the environment variables by creating a .env file in the root of the folder <br />
JWT_SECRET=[your jwt secret] <br />
NODEMAILER_EMAIL=[your nodemailer email] <br />
NODEMAILER_PASSWORD=[your nodemailer password] <br />

Once the dist folder is created run the following code in command line :
```
npm run start
```
This will run the server. You can use the following postman link to test out the API endpoints
https://www.postman.com/winter-rocket-472586/workspace/public-work/request/26133742-ae2c4816-3542-45f7-8035-f63b2bcf6c63


