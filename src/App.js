import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [actors, setActors] = useState([]);
  // issue with the API provider
  const [validationResponse, setValidationResponse] = useState("");
  const [filteredNicolasCageMovies, setFilteredNicolasCageMovies] = useState([]);
  const [filteredKeanuReevesMovies, setFilteredKeanuReevesMovies] = useState([]);

  useEffect(() => {
    fetchMoviesAndActors();
  }, []);

  const fetchMoviesAndActors = async () => {
    try {
      const accessToken = "d05c80d4-4a5f-46c7-85e7-ec0dff18b7fe";

      // Fetch movies
      const moviesResponse = await fetch(
        "https://switch-yam-equator.azurewebsites.net/api/movies",
        {
          headers: {
            "x-chmura-cors": accessToken,
          },
        }
      );
      const movies = await moviesResponse.json();

      // Fetch actors
      const actorsResponse = await fetch(
        "https://switch-yam-equator.azurewebsites.net/api/actors",
        {
          headers: {
            "x-chmura-cors": accessToken,
          },
        }
      );
      const actorsData = await actorsResponse.json();

      console.log("Movies:", movies);
      console.log("Actors:", actorsData);

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

      console.log("Filtered Actors:", filteredActors);

      setActors(filteredActors);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (
      actors.length > 0 &&
      filteredNicolasCageMovies.length > 0 &&
      filteredKeanuReevesMovies.length > 0
    ) {
      validateResults(
        actors,
        filteredNicolasCageMovies,
        filteredKeanuReevesMovies
      );
    }
  }, [actors, filteredNicolasCageMovies, filteredKeanuReevesMovies]);

  const validateResults = async (
    actors,
    nicolasCageMovies,
    keanuReevesMovies
  ) => {
    try {
      // console.log(`actors: ${JSON.stringify(actors)}`);
      // console.log(`nicolasCageMovies: ${JSON.stringify(nicolasCageMovies)}`);
      // console.log(`keanuReevesMovies: ${JSON.stringify(keanuReevesMovies)}`);

      const accessToken = "d05c80d4-4a5f-46c7-85e7-ec0dff18b7fe";

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

      console.log(`validationData: ${JSON.stringify(validationData)}`);

      // Perform validation request
      const response = await fetch(
        "https://switch-yam-equator.azurewebsites.net/api/validation",
        {
          method: "POST",
          headers: {
            "x-chmura-cors": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validationData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Validation API request failed with status ${response.status}`
        );
      }

      const responseData = await response.text();

      // Validate if response data is not empty
      if (!responseData || responseData.trim() === "") {
        throw new Error("Validation API returned an empty response");
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseData);
      } catch (error) {
        throw new Error("Validation API returned invalid JSON");
      }

      console.log("Validation Response:", parsedResponse);
      setValidationResponse(JSON.stringify(parsedResponse));
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
      <pre className="list-item">
        {validationResponse.length === 0
          ? "API returned an empty response"
          : validationResponse}
      </pre>
    </div>
  );
};

export default App;
