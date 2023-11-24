

document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.querySelector('.toggle-button');
  var mobileNav = document.querySelector('.hamburger-nav');
  var searchBox = document.getElementById('search-box');
  var searchResults = document.getElementById('search-results');
  var dimBackground = document.createElement('div');
  dimBackground.classList.add('dim-background');
  document.body.appendChild(dimBackground);

  // Toggle mobile navigation
  toggleButton.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
      toggleButton.classList.toggle('is-active');
  });

  // TODO: searchbox not in menu when toggle menu selected/clicked in mobile
  // Search box functionality
  searchBox.addEventListener('focus', function () {
      searchResults.classList.add('active');
      dimBackground.classList.add('active');
  });

  searchBox.addEventListener('input', function (e) {
      var value = e.target.value.toLowerCase();
      console.log(value); // Log each letter typed into the console
      searchResults.innerHTML = '<div>Searching for: ' + value + '</div>';
      if (!value) {
          searchResults.classList.remove('active');
      }
  });

  // Clicking on the dim background will close the search results and remove the background
  dimBackground.addEventListener('click', function () {
      searchResults.classList.remove('active');
      dimBackground.classList.remove('active');
  });

  // Function to update search results based on input
  function updateSearchResults(value) {
      // Here you would handle searching through your data or making an API call
      // For now, we are just updating the search results with the input value
      searchResults.innerHTML = ''; // Clear previous results

      if (value) {
          // This is a dummy result for demonstration purposes
          var resultItem = document.createElement('div');
          resultItem.textContent = "Result for '" + value + "'";
          searchResults.appendChild(resultItem);
          searchResults.classList.add('active');
      } else {
          searchResults.classList.remove('active');
      }
  }
});
