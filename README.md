# Actors List App

The goal of the Actors List App is to display a list of actors who have appeared in a movie with both Nicolas Cage and Keanu Reeves. The app fetches data from two APIs: one for retrieving movies and another for retrieving actors. It then filters the actors based on the movies they appeared in and displays the filtered list.

# Getting Started

To run this application locally, follow these steps:

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd actors-list-app
Install dependencies: npm install
Start the development server: npm start
Open your web browser and visit http://localhost:3000 to see the app in action.

# Usage

Upon launching the Actors List App, it will fetch movies and actors data from the respective APIs. The movies are filtered to include only those featuring both Nicolas Cage and Keanu Reeves. The actors are then filtered based on the movies they appeared in, considering only the filtered movies.

The filtered actors list will be displayed on the page, showing each actor's name and ID. Additionally, the app performs a validation request to another API to validate the actors' information and displays the response.

# Known Issue

Currently, the app encounters an issue with the validation API. The response from the API is empty, indicating that the API returned an empty response. This could be due to an issue with the API provider or if there is no data available for the given request.

# Author

<strong>Mauro Leos</strong> - <i>Front-End Developer</i> - <a href="https://www.linkedin.com/in/mauro-leos-b4103a11b/">LinkedIn </a>
