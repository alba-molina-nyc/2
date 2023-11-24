// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Select elements and create a dim background element
  const toggleButton = document.querySelector('.toggle-button');
  const mobileNav = document.querySelector('.hamburger-nav');
  const searchContainer = document.querySelector('.search-container');
  const searchBox = document.getElementById('search-box');
  const searchResults = document.getElementById('search-results');
  const dimBackground = document.createElement('div');
  dimBackground.classList.add('dim-background');
  document.body.appendChild(dimBackground);

  // Toggle mobile navigation
  toggleButton.addEventListener('click', function () {
    mobileNav.classList.toggle('active');
    toggleButton.classList.toggle('is-active');

    // Toggle the search container visibility
    searchContainer.style.display = mobileNav.classList.contains('active') ? 'none' : 'block';
  });

  // Search box functionality
  searchBox.addEventListener('focus', function () {
    showSearchResults();
  });

  searchBox.addEventListener('input', function (e) {
    const value = e.target.value.toLowerCase();
    console.log(value); // Log each letter typed into the console
    updateSearchResults(value);
  });

  // Clicking on the dim background will close the search results and remove the background
  dimBackground.addEventListener('click', function () {
    hideSearchResults();
  });

  // Function to show search results and dim background
  function showSearchResults() {
    searchResults.classList.add('active');
    dimBackground.classList.add('active');
  }

  // Function to hide search results and dim background
  function hideSearchResults() {
    searchResults.classList.remove('active');
    dimBackground.classList.remove('active');
  }

  // Function to update search results based on input
  function updateSearchResults(value) {
    searchResults.innerHTML = ''; // Clear previous results

    if (value) {
      // This is a dummy result for demonstration purposes
      const resultItem = document.createElement('div');
      resultItem.textContent = "Result for '" + value + "'";
      searchResults.appendChild(resultItem);
      showSearchResults(); // Show results and dim background
    } else {
      hideSearchResults(); // Hide results and dim background
    }
  }
});
