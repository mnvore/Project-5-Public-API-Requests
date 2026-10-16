// Confirm that the JavaScript file is connected
console.log("Project 5 JavaScript Connected");

//find the employee gallery in my html using it's class
    const gallery = document.querySelector(".gallery");//the class gallery gives html element a name so java script can find it

//create a modal window so when any part of the card is clicked, a modal windowl will pop up with additional information and close
const body = document.querySelector("body"); // select the html bodu where the modal will be added

//save 12 users so i can find their information when a card is clicked
let users = [];

//create the html structure for the modal window
const modalHTML = `
<div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>

    <div class="modal-info-container">
    </div>
</div>
</div>
`;
//add the modal html to the body of the page
body.insertAdjacentHTML("beforeend", modalHTML);
//hide the modal window until a user clicks on the card
const modalContainer = document.querySelector(".modal-container");
modalContainer.style.display = "none";
//add event listener when clicked inside the gallery
gallery.addEventListener("click", (event) => {
// find the whole card even if i click the photo or name
const userCard = event.target.closest(".card");

//stop if i click outside of the card
if (!userCard) return;

//find the user information that matches the car that i click on
const user = users[userCard.dataset.index];

//check that i found the correct user
console.log(user);
//show the information for the user i clicked on
displayUserModal(user);
});

// Request 12 random users from the API in a single request
fetch("https://randomuser.me/api/?results=12")

// Convert the API response from JSON into JavaScript data

//use promise to process successful response
.then((response) => response.json())
// Display the returned data in the browser console
.then((data) => {
//save 12 users so i can find their information when a card is clicked
    users = data.results;
    data.results.forEach((user, index) => {
    console.log(user);
//create the html for each user card
   const cardHTML = `
   <div class="card" data-index="${index}">
    <div class="card-img-container">
        <img class="card-img" src="${user.picture.medium}" alt="profile picture of ${user.name.first} ${user.name.last}">
   </div>
    <div class="card-info-container">
    <h3 class="card-name cap">${user.name.first} ${user.name.last}</h3>
    <p class="card-text">${user.email}</p>
    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
   </div>
   `;
//append the card to the gallery
   gallery.insertAdjacentHTML("beforeend", cardHTML);
});
})

// Display an error message if the request fails 
//use promise to handle failures
  .catch((error) => console.error("Error fetching users:", error));

  //show the information for the user i clicked
  function displayUserModal(user) {
//find the container where the user information will go
const modalInfo = document.querySelector(".modal-info-container");
//put the users address information togeher 
const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`; 
//change user birthday into readavle date
const birthday = new Date(user.dob.date).toLocaleDateString("en-US"); 

//create the html to display the users information in the modal
const userHTML = ` 
<img class="modal-img" src="${user.picture.large}" alt="profile picture of ${user.name.first} ${user.name.last}">
<h3 class="modal-name cap">${user.name.first} ${user.name.last}</h3>
<p class="modal-text">${user.email}</p>
<p class="modal-text cap">${user.location.city}</p>
<hr>
<p class="modal-text">${user.cell}</p>
<p class="modal-text">${address}</p>
<p class="modal-text">Birthday: ${birthday}</p>
`;

//add the user information to the modal
modalInfo.innerHTML = userHTML;
//show the modal window
modalContainer.style.display = "";
}
//find the X button in the modal window pop up
const closeButton = document.querySelector("#modal-close-btn");

//close the modal when i click on the X button
closeButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
});
 