Train Booking API

Step1: Clone repository locally and open that folder in code editor.

Step2: run-> 'npm init' in the terminal to initialize the project.

Step3: run-> 'npm install' in terminal to install the dependencies.

Step4: run-> 'npm install express' in terminal to install the expressjs package.

Step5: run-> 'npm install mysql' in terminal to install the mysql package for database.

Step6: Now go the Mysql Workbench to create database and tables.

Step7: After going to the Mysql Workbench create database named train ['create database train'].

Step8: After creating database use this command 'use train' to start using the created database.

Step9: After that create four different tables in the database.

Step10: TABEL1 - 'users' which has user_id,username and pass as attributes.

Step11: TABEL2 - 'trains' having attributes as train_id,train_name,source,destination.

Step12: TABEL3 - 'bookings' having attributes as booking_id,userid,trainid,booked_seats.

Step13: TABLE4 - 'seats_avail' having attributes as train_id,available_seats,sourc,destination.

Step14: After creating table go the index.js file change the database credentials according to yours.

Step15: To check various endpoints run-> 'node index.js' and then you can use Postman [API gets host at localhost:3000].
Step16: In Postman you can make get/post request to various api endpoints and pass data in the body to check the functionality of api.
