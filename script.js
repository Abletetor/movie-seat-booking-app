// Defining and selecting html elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// call populate UI to load data from the browser localstorage
populateUI();

// convert string (price) value to number
let ticketPrice = +movieSelect.value;

// function to save selected movie index and price in local storage
function setMovieData (movieIndex, moviePrice) {
     localStorage.setItem("selectedMovieIndex", movieIndex);
     localStorage.setItem("selectedMoviePrice", moviePrice);
}

// function to get data from localstorage and populate the UI
function populateUI () {
     // retrieving seats
     const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
     if (selectedSeats !== null && selectedSeats.length > 0) {
          seats.forEach((seat, index) => {
               if (selectedSeats.indexOf(index) > -1) {
                    seat.classList.add("selected");
               }
          });
     }

     // retrieving movies
     const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
     if (selectedMovieIndex !== null) {
          movieSelect.selectedIndex = selectedMovieIndex;
     }
}

// function to update the selected Seat & count
function updateSelectedCount () {
     const selectedSeats = document.querySelectorAll(".row .seat.selected");

     // grab the indexes of the seats of array
     const seatsIndex = [...selectedSeats].map(function (seat) {
          return [...seats].indexOf(seat);
     });
     // storing the seat index in local storage
     localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

     //update total and count variables
     const selectedSeatsCount = selectedSeats.length;
     count.innerText = selectedSeatsCount;
     total.innerText = selectedSeatsCount * ticketPrice;
};

// movie select event handler
movieSelect.addEventListener("change", (e) => {
     ticketPrice = +e.target.value;

     setMovieData(e.target.selectedIndex, e.target.value);
     updateSelectedCount();
});

//listening to click on the container element
container.addEventListener("click", function (e) {
     if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
          e.target.classList.toggle("selected");
     }
     //call update function
     updateSelectedCount();
});

//update data on page load
updateSelectedCount();