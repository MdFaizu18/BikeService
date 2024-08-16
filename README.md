# Bike Services
This application is for owners of Bike service stations. It helps the owners to list all the services they offer. Customers can choose one or more services to book
## Getting Started

### Pre-requisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Install dependencies for both the client and server:**

    ```sh
    cd client
    npm install
    cd server
    npm install
    ```

### Running the Application

1. **Start the backend server:**

    ```sh
    cd server
    npm start
    ```

2. **Start the frontend development server:**

    ```sh
    cd client
    npm run dev
    ```

### Folder Structure

- `client/`: Contains the React frontend code for user interface.
- `server/`: Contains the backend code for handling backend functionalities.

### For admin login use this credetials
```sh
- email: admin@gmail.com
- password: 123456789
```

### Features

- Kinda User Template and more flexible.
- Admin have all the CRUD operations over services and bookings.
- Used Nodemailer for sending email notifications to users and admin.
- Used Cloudinary and multer for uploading images and fetching images.
- Used Material UI framework for user-friendly Interaction.

### Technologies Used

- React
- Material UI
- Express.js
- Node.js
- MongoDB
- Nodemailer (for sending emails)
- Cloudinary (for image handling)
  
### Specifications:

### Bike station owner:
- Should be able to create / edit / delete all his services and their details -
View a list of all bookings ( pending, ready for delivery and completed) -
View details of each booking
- Mark a booking as ready for delivery
- Mark a booking as completed
- Receive an email whenever a booking is made

### Customers
- Should be able to register for an account with his email address and mobile number -
Book a service at a particular date
- See the status of his booking
- See all his previous bookings
- Receive an email as soon as his booking is ready for delivery# Bike-Services

## To create dist file 
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

## To use concurrently to run both backend and frontend in single command
server.js
  "scripts": {
    "setup-project": "npm i && cd client && npm i",
    "server": "nodemon server",
    "client": "cd client && npm run dev",
    "dev": "concurrently --kill-others-on-fail \" npm run server\" \" npm run client\""
  },

client

# WS_MERN_PRJ_01
