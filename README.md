<h1>🚀 Features </h1>

    ✅ User Registration with hashed password (bcrypt)
    ✅ JWT Authentication for login
    ✅ Email Confirmation with expiring confirmation links
    ✅ Refresh Token for re-sending confirmation email
    ✅ Password Reset via emailed OTP code
    ✅ Token-Based Protected Routes
    ✅ Modular, Scalable Codebase

<h1>🛠️ Technologies Used </h1>

   | 🧩 **Technology**                                                                                                             | 📌 **Purpose**                                               |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white\&style=flat-square) **Node.js**          | JavaScript runtime used to build the server-side logic       |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express\&logoColor=white\&style=flat-square) **Express.js** | Fast and minimalist web framework for building REST APIs     |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white\&style=flat-square) **MongoDB**          | NoSQL database for flexible and scalable data storage        |
| ![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=flat-square\&logoColor=white) **Mongoose**                     | ODM (Object Data Modeling) for managing MongoDB with schemas |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens\&logoColor=white\&style=flat-square) **JWT (jsonwebtoken)** | Secure token-based authentication and route protection       |
| 🔒 **bcryptjs**                                                                                                               | Library for hashing and comparing passwords securely         |
| 📧 **nodemailer**                                                                                                             | Sends email verifications, password resets, and OTP codes    |
| 🧬 **nanoid**                                                                                                                 | Generates unique, secure OTP codes for verification          |
| 🧪 **dotenv**                                                                                                                 | Loads environment variables from `.env` into `process.env`   |

<h1>📬 Email Flow</h1>

| ✉️ **Step**            | 🔍 **Description**                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📝 **Signup**          | When a new user registers, they receive a **confirmation email** with:<br> 🔗 A link to verify their email address<br> ♻️ A refresh link in case the confirmation token expires |
| ✅ **Confirm Email**    | The user activates their account by clicking the **confirmation link**, updating their `isConfirmed` status in the database                                                     |
| 🔐 **Forgot Password** | If a user forgets their password, they can request a **One-Time Password (OTP)** via email<br> 🔁 They use the OTP to reset and update their password securely                  |
