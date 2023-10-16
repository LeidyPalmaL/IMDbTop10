import React, { useEffect } from 'react';

function MovieList() {
  // Crea un estado para guardar los datos del API
  const [movies, setMovies] = React.useState([]);

  // Crea un efecto para hacer la petición al API cuando el componente se monte
  useEffect(() => {
    // Define las opciones de la petición
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '00920920cdmshbdd824913699fb1p15d944jsn936b54ce46c3',
        'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
      }
    };

    // Usa fetch para hacer la petición y obtener la respuesta
    fetch('https://imdb188.p.rapidapi.com/api/v1/getWeekTop10', options)
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con los datos del API
        normalizeSize(data.data);
      })
      .catch(error => {
        // Muestra un mensaje de error en caso de fallar la petición
        console.error(error);
      });
  }, []); // Usa un array vacío como dependencia para que el efecto solo se ejecute una vez

  function normalizeSize(array) {
    const moviesArray = [];

    for (let movie of array) {
      let movieObject = {};
      
      movieObject.id = movie.id;
      movieObject.isAdult = movie.isAdult;
      movieObject.title = movie.originalTitleText.text;
      movieObject.imageUrl = movie.primaryImage.imageUrl;
      movieObject.imageWidth = movie.primaryImage.imageWidth;
      movieObject.imageHeight = movie.primaryImage.imageHeight;

      let min = Math.min(movieObject.imageWidth, movieObject.imageHeight);
      if (movieObject.imageWidth == min) {
        movieObject.imageWidth = movieObject.imageWidth * 200 / movieObject.imageHeight;
        movieObject.imageHeight = 200;
      } else {
        movieObject.imageHeight = movieObject.imageHeight * 200 / movieObject.imageWidth;
        movieObject.imageWidth = 200;
      }

      movieObject.type = movie.titleType.text;
      movieObject.description = movie.plot.plotText.plainText;
      movieObject.releaseDate = `${movie.releaseDate.year}-${movie.releaseDate.month}-${movie.releaseDate.day}`;
      movieObject.country = movie.releaseDate.country;
      movieObject.rank = movie.chartMeterRanking.currentRank;
      movieObject.rankDifference = movie.chartMeterRanking.rankChange.difference;
      movieObject.randDirection = movie.chartMeterRanking.rankChange.changeDirection;

      moviesArray.push(movieObject);
    }

    setMovies(moviesArray);
  }

  // Retorna un elemento JSX con la lista de películas
  return (
    <div className="movie-list">
      <h1>IMDb Top 10</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.imageUrl} width={movie.imageWidth} height={movie.imageHeight} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
