const apiKey = '93cc1c40'; // Replace with your API key

// Search input element
const searchInput = document.getElementById('searchInput');

// Results container element
const searchResults = document.getElementById('searchResults');

// Favorites container element
const favoritesContainer = document.getElementById('favorites');

// Array to store favorite movies
let favorites = [];

// Event listener for search input
searchInput.addEventListener('input', handleSearch);

// Function to handle search
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  } else {
    clearResults();
  }
}

// Function to search movies
function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        displaySearchResults(data.Search);
      } else {
        clearResults();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      clearResults();
    });
}

// Function to display search results
function displaySearchResults(movies) {
  searchResults.innerHTML = '';

  movies.forEach(movie => {
    const { imdbID, Title, Year, Poster } = movie;

    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const posterImg = document.createElement('img');
    posterImg.src = Poster !== 'N/A' ? Poster : 'placeholder.png';
    posterImg.alt = Title;
    movieItem.appendChild(posterImg);

    const movieDetails = document.createElement('div');
    const titleElement = document.createElement('h2');
    titleElement.classList.add('movie-item-title');
    titleElement.textContent = Title;
    const yearElement = document.createElement('p');
    yearElement.textContent = Year;
    movieDetails.appendChild(titleElement);
    movieDetails.appendChild(yearElement);
    movieItem.appendChild(movieDetails);

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Add to favorites';
    favoriteButton.addEventListener('click', () => addToFavorites(movie));
    movieItem.appendChild(favoriteButton);

    // Add click event listener to open movie page
    movieItem.addEventListener('click', () => openMoviePage(imdbID));

    searchResults.appendChild(movieItem);
  });
}

// Function to clear search results
function clearResults() {
  searchResults.innerHTML = '';
}

// Function to add a movie to favorites
function addToFavorites(movie) {
  if (!isMovieInFavorites(movie)) {
    favorites.push(movie);
    displayFavorites();
  }
}

// Function to check if a movie is in favorites
function isMovieInFavorites(movie) {
  return favorites.some(favorite => favorite.imdbID === movie.imdbID);
}

// Function to display favorites
function displayFavorites() {
  favoritesContainer.innerHTML = '';

  favorites.forEach(movie => {
    const { imdbID, Title, Year, Poster } = movie;

    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('favorite-item');

    const posterImg = document.createElement('img');
    posterImg.src = Poster !== 'N/A' ? Poster : 'placeholder.png';
    posterImg.alt = Title;
    favoriteItem.appendChild(posterImg);

    const favoriteDetails = document.createElement('div');
    const titleElement = document.createElement('h2');
    titleElement.classList.add('favorite-item-title');
    titleElement.textContent = Title;
    const yearElement = document.createElement('p');
    yearElement.textContent = Year;
    favoriteDetails.appendChild(titleElement);
    favoriteDetails.appendChild(yearElement);
    favoriteItem.appendChild(favoriteDetails);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove from favorites';
    removeButton.addEventListener('click', () => removeFromFavorites(imdbID));
    favoriteItem.appendChild(removeButton);

    favoritesContainer.appendChild(favoriteItem);
  });
}

// Function to remove a movie from favorites
function removeFromFavorites(imdbID) {
  favorites = favorites.filter(movie => movie.imdbID !== imdbID);
  displayFavorites();
}

// Function to open movie page
function openMoviePage(imdbID) {
  // Open a new window or tab with the movie page
  window.open(`movie.html?id=${imdbID}`, '_blank');
}
