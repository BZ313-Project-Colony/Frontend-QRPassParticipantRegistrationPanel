# Frontend QRPass Participant Registration Panel Setup

Welcome to the QR Pass Participant Registration Panel React app! This README provides instructions on setting up and running the app locally. Ensure you have Node.js and npm installed on your machine before proceeding.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BZ313-Project-Colony/Frontend-QRPassParticipantRegistrationPanel.git
   ```

2. Change into the project directory:

   ```bash
   cd Frontend-QRPassParticipantRegistrationPanel
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the App

Now that you have installed the dependencies and set up the environment variables, you can run the app locally.

```bash
npm start
```

This command starts the development server. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Building for Production

To build the app for production, use the following command:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Documentation

The code provided is a React application that registers users for events. It's composed of multiple components, hooks, and third-party libraries.

**Import Statements**
1. Importing necessary react hooks and components from "react" and "react-router-dom".
2. Importing third-party libraries including "axios" for HTTP requests and "react-toastify" for notifications.
3. Importing custom components like "FormInput", "ErrorPage", and utility functions like "formatTimestamp".
4. Importing CSS for react-toastify.

**App Component**
1. Declaring state variables using `useState` for form values, event details, loading status, and error messages.
2. Using `useParams` to fetch event_id from the URL.
3. An array of input field specifications like `name`, `label`, `type`, `pattern`, etc. is created for the form fields.
4. Using `useEffect` to fetch event details from an API when the component mounts.
5. The `handleSubmit` function handles form submission. It checks if a checkbox is checked, then makes a POST request to an API to register the user for the event.
6. The `onChange` function handles changes in form input values and updates the state.

**Rendering**
1. If an error occurs while fetching event details, the ErrorPage component is rendered.
2. If no error occurs, a form is rendered for user registration. It includes fields for name, surname, and email, and a checkbox for user agreement. 
3. Event details are displayed on the page, and success or error notifications are shown based on the user's actions.

**Code Example**
```jsx
import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here...
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center h-100">
      <form className="w-25" onSubmit={handleSubmit}>
        <p className="h5 text-center mb-4">Sign in</p>
        <MDBInput
          label="Type your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="defaultFormLoginEmailEx"
          className="mb-4"
        />
        <MDBInput
          label="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="defaultFormLoginPasswordEx"
          className="mb-4"
        />
        {error && <MDBAlert color="danger">{error}</MDBAlert>}
        <div className="text-center mt-4">
          <MDBBtn color="indigo" type="submit">Login</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}

export default LoginPage;
```
This code is a simplified version of a login page using React and MDBReact for styling. The page contains a form with fields for email and password. The `useState` hook is used to manage the state of these fields and any error messages. The `handleSubmit` function, which is to be filled with login logic, is triggered when the form is submitted. If there is an error, an alert is displayed on the page.
