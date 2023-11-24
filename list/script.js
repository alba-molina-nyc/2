document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.querySelector('.toggle-button');
  var mobileNav = document.querySelector('.mobile-nav');

  toggleButton.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
  });
});
