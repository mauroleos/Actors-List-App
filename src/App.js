import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [actors, setActors] = useState([]);
  const [filteredNicolasCageMovies, setFilteredNicolasCageMovies] = useState([]);
  const [filteredKeanuReevesMovies, setFilteredKeanuReevesMovies] = useState([]);
  const [responseStatus, setResponseStatus] = useState("");

  let accessToken = "d05c80d4-4a5f-46c7-85e7-ec0dff18b7fe";

  useEffect(() => {
    const fetchMoviesAndActors = async () => {
      try {
        // Fetch movies
        const moviesResponse = await fetch("https://switch-yam-equator.azurewebsites.net/api/movies", {
          headers: {
            "x-chmura-cors": accessToken,
          },
        });
        const movies = await moviesResponse.json();

        // Fetch actors
        const actorsResponse = await fetch("https://switch-yam-equator.azurewebsites.net/api/actors", {
          headers: {
            "x-chmura-cors": accessToken,
          },
        });
        const actorsData = await actorsResponse.json();

        // Filter movies for Nicolas Cage and Keanu Reeves
        const filteredNicolasCageMoviesData = movies.filter((movie) =>
          movie.actors.includes(115)
        );
        const filteredKeanuReevesMoviesData = movies.filter((movie) =>
          movie.actors.includes(206)
        );

        setFilteredNicolasCageMovies(filteredNicolasCageMoviesData);
        setFilteredKeanuReevesMovies(filteredKeanuReevesMoviesData);

        // Filter actors based on movies they appeared in
        const filteredActors = actorsData.filter((actor) => {
          const actorMovies = movies.filter((movie) =>
            movie.actors.includes(actor.actorId)
          );
          const actorMoviesIds = actorMovies.map((movie) => movie.movieId);
          return (
            filteredNicolasCageMoviesData.some((movie) =>
              actorMoviesIds.includes(movie.movieId)
            ) &&
            filteredKeanuReevesMoviesData.some((movie) =>
              actorMoviesIds.includes(movie.movieId)
            )
          );
        });

        setActors(filteredActors);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchMoviesAndActors();
  }, [accessToken]);

  useEffect(() => {
    const validateResults = async (actors, nicolasCageMovies, keanuReevesMovies) => {
      try {
        // Prepare validation data
        const validationData = actors.map((actor) => ({
          Name: actor.name,
          ActorId: actor.actorId,
          KRMovies: keanuReevesMovies
            .filter((movie) => movie.actors.includes(actor.actorId))
            .map((movie) => movie.title),
          NCMovies: nicolasCageMovies
            .filter((movie) => movie.actors.includes(actor.actorId))
            .map((movie) => movie.title),
        }));

        // Perform validation request
        const response = await fetch("https://switch-yam-equator.azurewebsites.net/api/validation", {
          method: "POST",
          headers: {
            "x-chmura-cors": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validationData),
        });

        if (!response.ok) {
          throw new Error(`Validation API request failed with status ${response.status}`);
        }

        const responseData = await response.text();

        setResponseStatus(response.status);

        // Validate if response data is not empty
        if (!responseData || responseData.trim() === "") {
          throw new Error("Validation API returned an empty response");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (
      actors.length > 0 &&
      filteredNicolasCageMovies.length > 0 &&
      filteredKeanuReevesMovies.length > 0
    ) {
      validateResults(actors, filteredNicolasCageMovies, filteredKeanuReevesMovies);
    }
  }, [actors, filteredNicolasCageMovies, filteredKeanuReevesMovies, accessToken]);

  return (
    <div className="app">
      <h1 className="title">Actors List</h1>
      <ul className="actor-list">
        {actors.map((actor) => (
          <li className="list-item" key={actor.actorId}>
            {actor.name} (ID: {actor.actorId})
          </li>
        ))}
      </ul>
      <h2 className="title">Validation Response</h2>
      <pre className="list-item">{`Response status is ${responseStatus}`}</pre>
    </div>
  );
};

export default App;
