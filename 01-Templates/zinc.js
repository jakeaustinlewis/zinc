'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        let userList = document.getElementById("z-user-list");
        console.log(results); // eslint-disable-line no-console
        for (let i = 0; i < results.length; i++) {

            let user = document.createElement("li");
            user.classList.add("user");

            let userPhoto = document.createElement("img");
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
        }
    }

    function replacer(match, p1, p2, p3, p4, p5, p6, offset, string) {


    }

    function renderTemplate(userTemplate, data) {
        let userList = document.getElementById("z-user-list");

        console.log(data);


        let string = /{{\s*([A-Za-z0-9-]+)\s*}}/gm;

        let dataMap = data.map(user => {
            const userData = {
                photo: user.picture.thumbnail,
                firstName: user.name.first,
                lastName: user.name.last,
                city: user.location.city,
                state: user.location.state,
                email: user.email
            };
            return userData;

        })
        console.log(dataMap);

        dataMap.forEach(user => {
            let userString = userTemplate.replace(string, (match, captured) => {

                return user[captured];
                
            })
            userList.insertAdjacentHTML('afterend', userString);
        })
    }



    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => {

                let userTemplate = `<li class="user">
                        <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
                        <div class="user-name">{{ firstName }} {{ lastName }}</div>
                        <div class="user-location">{{ city }}, {{ state }}</div>
                        <div class="user-email">{{ email }}</div>
                    </li>`;

                renderTemplate(userTemplate, json.results);
            })
    }

    document.addEventListener('DOMContentLoaded', init);
})();