# Disputify
A collaborative grade dispute system for CS students at USC
**Created Janurary, 2017**

## Table of Contents
- [About](#about)
- [Installation Instructions](#installation-instructions)
- [Built With](#built-with)
- [Features](#features)

## Creator
- [Siyuan Xu](https://github.com/1009700427)

## About
Disputify is a desktop app tha allows for resolving disputes between students and course staff. Students can raise issues and course staff can resolve those issues.

## Installation Instructions:
#### Prerequisites
Requires Node.js
Installed MySQL
1. Clone the repository
2. ```cd Disputify```
3. Run the query from ```backend/database/db.sql```
4. Run ```npm install``` to download node modules
5. Run ```npm run server``` to start the server
6. Run ```npm start``` to launch the app

## Built With
- Electron
- Frontend
    - React.js
    - React-Bootstrap
    - LESS
    - HTML/CSS
- Backend
    - Express.js
    - MySQL
## Features

### Login and Register Page
When you first open the app, it will ask you whether you are a student or a staff member. Then it will navigate you to the correct page for login and registration. Default username and password are both set to 111 for faculty and students, although you can also regieter your own customized user.

<img width="1024" alt="1" src="https://user-images.githubusercontent.com/22974252/35257731-f2ffb6ea-ffaf-11e7-9eca-3e971e4c6dee.png">
<img width="1024" alt="2" src="https://user-images.githubusercontent.com/22974252/35257757-140dfb62-ffb0-11e7-92de-69631ca743b9.png">
<img width="1024" alt="7" src="https://user-images.githubusercontent.com/22974252/35257908-f0a615be-ffb0-11e7-96f5-e47b625944d1.png">


### Student Assignment List
Your account will open to a preview of all your existing assignments, which are stored in mySQL tables.

<img width="1024" alt="3" src="https://user-images.githubusercontent.com/22974252/35257836-8ab1f584-ffb0-11e7-9511-04d8a320b4bb.png">
<img width="1024" alt="4" src="https://user-images.githubusercontent.com/22974252/35257840-90b16e10-ffb0-11e7-9ff2-f89d47ccf53c.png">

### Raise Dispute
After clicking on one of the assignment boxes, you will be redirected to a new page for raising disputes and checking dispute status.

<img width="1024" alt="5" src="https://user-images.githubusercontent.com/22974252/35257885-d03459b2-ffb0-11e7-8cd0-db2492e08af0.png">
<img width="1024" alt="6" src="https://user-images.githubusercontent.com/22974252/35257892-d63ca6c0-ffb0-11e7-902d-1eb5f9077840.png">

### Faculty Course List
After logging into a faculty page, you will be able to search for, or just show all the courses of USC's CS Department stored in our database.

<img width="1024" alt="8" src="https://user-images.githubusercontent.com/22974252/35257960-54edfe4c-ffb1-11e7-83c1-1573417d6737.png">

After clicking on one of the courses, you will see a full list of dispute notifications from different students. By clicking on the resolve/unresolve button, you can change the dispute status.

<img width="1024" alt="9" src="https://user-images.githubusercontent.com/22974252/35258011-a2059578-ffb1-11e7-9d3d-8e095397bb89.png">
