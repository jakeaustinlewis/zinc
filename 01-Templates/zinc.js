
'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        let userList = document.getElementById("z-user-list");
        console.log(results); // eslint-disable-line no-console
          for (let i=0; i<results.length; i++){

                    
                    let user = document.createElement("li");
                    user.classList.add("user");

                    let userPhoto= document.createElement("img");
                    userPhoto.classList.add("user-photo");
                    userPhoto.setAttribute("src", results[i].picture.medium)
                    // userPhoto.setAttribute("src", `Photo of ` ${json.results[i].name.first} ${json.results.name.last});

                    let userName = document.createElement("div");
                    userName.classList.add("user-name");
                    userName.innerHTML = results[i].name.first + " " + results[i].name.last; 


                    let userLocation = document.createElement("div");
                    userLocation.classList.add("user-location");
                    userLocation.innerHTML = `${results[i].location.city},  ${results[i].location.state}`;


                    let userEmail = document.createElement("div");
                    userEmail.classList.add("user-email");
                    userEmail.innerHTML = results[i].email;


                    user.append(userPhoto, userName, userLocation, userEmail);
                    userList.append(user);
                    // userList.classList.add("user-list");
                }
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();