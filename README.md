# Actors List App

This is a React application that displays a list of actors based on certain criteria and fetches data from an external API. The application utilizes the React hooks useState and useEffect for managing state and performing side effects respectively.

# Installation

To run this application locally, follow these steps:

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd actors-list-app
Install the dependencies: npm install
Start the development server: npm start
Open your browser and visit http://localhost:3000

# Usage

Upon launching the application, it fetches data from the API to retrieve a list of movies and actors. It then filters the movies based on actors' IDs to find movies featuring Nicolas Cage and Keanu Reeves.

The filtered movies are used to determine the actors who appeared in both Nicolas Cage and Keanu Reeves movies. The resulting list of actors is displayed on the page.

Additionally, the application performs a validation request using the filtered actors, Nicolas Cage movies, and Keanu Reeves movies. The validation response is logged in the console.

Please note that there might be an issue with the API provider. The code has been tested using Postman, and the API returned a successful response with a status of "200 OK." If you encounter any errors or empty responses, the issue might be related to the API provider's end.

# Author

<strong>Mauro Leos</strong> - <i>Front-End Developer</i> - <a href="https://www.linkedin.com/in/mauro-leos-b4103a11b/">LinkedIn </a>
