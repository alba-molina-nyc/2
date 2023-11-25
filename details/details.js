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
  initializeReplyButtons();

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


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // Search form submission handler
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = this.querySelector('input[type="search"]').value;
    console.log('Searching for:', searchTerm);
    // Implement the actual search logic or redirection here
  });

  // Event listener for 'Show more' functionality
  const showMoreButton = document.getElementById('showMoreButton');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', function() {
      // Implement logic to load and display more comments
      console.log('Show more comments...');
    });
  }

  // Event delegation for upvote/downvote buttons within the comments section
  const commentsSection = document.getElementById('comments-section');
  if (commentsSection) {
    commentsSection.addEventListener('click', function(event) {
      if (event.target.matches('.upvote')) {
        const commentId = event.target.closest('.comment').id;
        upvote(commentId);
      } else if (event.target.matches('.downvote')) {
        const commentId = event.target.closest('.comment').id;
        downvote(commentId);
      }
    });
  }

});

// Toggle hamburger menu
function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

// Toggle search on mobile
function toggleSearch() {
  const searchForm = document.querySelector('.search-form');
  searchForm.style.display = window.getComputedStyle(searchForm).display === 'flex' ? 'none' : 'flex';
}

// Apply markdown formatting to textarea input
function applyMarkdown(syntax) {
  const textarea = document.getElementById('text-input');
  wrapText(textarea, syntax, syntax);
}

// Insert a link into textarea
function insertLink() {
  const textarea = document.getElementById('text-input');
  const linkText = prompt('Enter the link text:', 'link text');
  const linkUrl = prompt('Enter the URL:', 'http://example.com');
  insertAtCursor(textarea, `[${linkText}](${linkUrl})`);
}

// Apply list formatting to selected textarea input
function applyList(syntax) {
  const textarea = document.getElementById('text-input');
  prependLines(textarea, syntax);
}

// Insert text at the current cursor position in textarea
function insertAtCursor(textarea, text) {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos);
  textarea.selectionStart = textarea.selectionEnd = startPos + text.length;
  textarea.focus();
}

// Function to wrap selected text in textarea with given syntax
function wrapText(textarea, before, after) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  textarea.value = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + before.length + selectedText.length;
  textarea.focus();
}

// Function to prepend each selected line in textarea with given syntax
function prependLines(textarea, syntax) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const modifiedText = selectedText.split('\n').map(line => syntax + line).join('\n');
  insertAtCursor(textarea, modifiedText);
}

// Creation of new comments and replies dynamically
function addComment(content, parentId = null) {
  const commentSection = document.getElementById('comments-section');
  const parentElem = parentId ? document.getElementById(parentId).querySelector('.replies') : commentSection;
  const newComment = document.createElement('div');
  newComment.classList.add('comment');
  newComment.innerHTML = `
    <div class="comment-body">
      <p>${content}</p>
    </div>
    <div class="replies"></div>
  `;
  parentElem.appendChild(newComment);
}

// TODO: this is not functional RN

// Upvoting and downvoting functionalities
function upvote(commentId) {
  console.log(`Upvoting comment with ID: ${commentId}`); // Log which comment is being upvoted
  updateVotes(commentId, 1); // Increment votes by 1
}

function downvote(commentId) {
  console.log(`Downvoting comment with ID: ${commentId}`); // Log which comment is being downvoted
  updateVotes(commentId, -1); // Decrement votes by 1
}

// Function to update the votes count
function updateVotes(commentId, delta) {
  const comment = document.getElementById(commentId);
  if (comment) {
    const votesCountElem = comment.querySelector('.votes-count');
    if (votesCountElem) {
      let votesCount = parseInt(votesCountElem.textContent.replace('k', '')) * 1000;
      votesCount += delta;
      votesCountElem.textContent = `${(votesCount / 1000).toFixed(1)}k`;
      console.log(`Updated votes for comment ID ${commentId}: ${votesCountElem.textContent}`); // Log the new votes count
    } else {
      console.log(`Votes count element not found for comment ID ${commentId}`);
    }
  } else {
    console.log(`Comment element not found for ID ${commentId}`);
  }
}

// TODO: reply comment come out when hit "reply"
