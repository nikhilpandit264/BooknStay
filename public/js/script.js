// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


// for side bar and updating placeholder 


  function closeSidebar() {
    let sidebar = document.getElementById("navbarNavAltMarkup");
    let bsCollapse = bootstrap.Collapse.getInstance(sidebar);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  }

  function updatePlaceholder() {
  const input = document.querySelector(".search-inp");
  if (window.innerWidth <= 405) {
    input.setAttribute("placeholder", "Search City");
  } else {
    input.setAttribute("placeholder", "Search Destination");
  }
}

// Run on page load
updatePlaceholder();

// Run on window resize
window.addEventListener("resize", updatePlaceholder);
