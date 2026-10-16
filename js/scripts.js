// Confirm that the JavaScript file is connected
console.log("Project 5 JavaScript Connected");

//find the employee gallery in my html using it's class
    const gallery = document.querySelector(".gallery");//the class gallery gives html element a name so java script can find it

// Request 12 random users from the API in a single request
fetch("https://randomuser.me/api/?results=12")

// Convert the API response from JSON into JavaScript data

//use promise to process successful response
.then((response) => response.json())

// Display the returned data in the browser console
.then((data) => {
    data.results.forEach(user => {
    console.log(user);
//create the html for each user card
   const cardHTML = `
   <div class="card">
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
 