# Actors List App

The goal of the Actors List App is to display a list of actors who have appeared in a movie with both Nicolas Cage and Keanu Reeves. The app fetches data from two APIs: one for retrieving movies and another for retrieving actors. It then filters the actors based on the movies they appeared in and displays the filtered list.

# Getting Started

To run this application locally, follow these steps:

*Clone the repository: git clone <repository-url>
*Navigate to the project directory: cd actors-list-app
*Install dependencies: npm install
*Start the development server: npm start
\*Open your web browser and visit http://localhost:3000 to see the app in action.

# Features

*Fetches a list of movies and actors from an API.
*ilters the movies to retrieve only those featuring Nicolas Cage and Keanu Reeves.
*Filters the actors based on the movies they appeared in.
*Sends a validation request to another API with the filtered data.
*Displays the list of actors and their IDs.
*Displays the response status from the validation request.

# Configuration

The application uses an access token to authenticate API requests. You can replace the accessToken variable in the code with your own token if required.

# API Endpoints

*Movies API: https://switch-yam-equator.azurewebsites.net/api/movies
*Actors API: https://switch-yam-equator.azurewebsites.net/api/actors
\*Validation API: https://switch-yam-equator.azurewebsites.net/api/validation

# Author

<strong>Mauro Leos</strong> - <i>Front-End Developer</i> - <a href="https://www.linkedin.com/in/mauro-leos-b4103a11b/">LinkedIn </a>
