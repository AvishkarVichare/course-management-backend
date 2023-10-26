# course-management-backend


This is the backend server for the Course Management application, which provides services for managing courses, instructors, and lectures.

## Technologies Used

The backend server is built using the following technologies:

- **Express.js**: A web application framework for building robust APIs.
- **MongoDB**: A NoSQL database used for storing and managing data.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **bcrypt.js**: Used for hashing and salting passwords for user authentication.
- **jsonwebtoken (JWT)**: Utilized for generating and validating JSON Web Tokens for user authentication.

## Deployment

This backend server is hosted on [Deta Space](https://deta.space/). Deta Space is a serverless platform that simplifies deployment and scaling.

## Routes

Here are some of the key routes used in this backend application(main api url will come before below endpoints which i have used in project :

- `POST /api/v1/a/login`: Allows admin to log in and receive an authentication token.
- `POST /api/v1/a/create`: Enables admin registration and receive an authentication token.
- `POST /api/v1/i/create`: Enables instrutor registration and receive an authentication token.
- `POST /api/v1/i/login`: Enables instructor log in and receive an authentication token.
- `GET /api/v1/c/get`: Retrieves a list of all courses.
- `POST /api/v1/c/create`: Creates a new course.
- `GET /api/v1/i/get`: Retrieves a list of all instructors.
- `POST /api/v1/i/create`: Adds a new instructor.
- `GET /api/v1/l/getlectures`: Retrieves a list of all lectures of specific instructor(it gives list of all lectures that scheduled for instructor which he can see when logged in)
- `POST /api/v1/c/l/add`: Creates a new lecture for course.
- `POST /api/v1/c/i/add`: Creates a new lecture for course.
- `GET /api/v1/c/i/get/:courseId`: gets list of all lectures that in course (sheduled lectures with instructor name).

  

- **[Link to Frontend Repository](https://github.com/AvishkarVichare/course-manament-frontend)**: You can find the frontend repository linked here.
