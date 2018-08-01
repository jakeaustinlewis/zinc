'use strict';

/* eslint-env browser */

(() => {

    function populateList(results) {
        let userList = document.getElementById("z-user-list");
        console.log(results); // eslint-disable-line no-console
        for (let i = 0; i < results.length; i++) {

            userList.insertAdjacentHTML('beforeend', `
            <li class="user">
                <img class="user-photo" src="${results[i].picture.medium}" alt="">
                <div class="user-name">${results[i].name.first} ${results[i].name.last}</div>
                <div class="user-location">${results[i].location.city},  ${results[i].location.state}</div>
                <div class="user-email">${results[i].email}</div>
            </li>`);

        }
    }

    function renderTemplate(userTemplate, data) {
        let userList = document.getElementById("z-user-list");

        console.log(data);


        let regex = /{{\s*(\w+)\s*}}/gm;


        data.forEach(user => {
            let userString = userTemplate.replace(regex, (match, captured) => {
                // console.log("captured: ", captured);
                let splitArr = captured.split(".");
                let correctArr = [];
                for (let i=0; i>splitArr.length; i++){
                    user[splitArr[i]] = splitArr[i];
                }


            })
            userList.insertAdjacentHTML('afterend', userString);
        })
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => {

                let userTemplate = `<li class="user">
    <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
    <div class="user-name">{{ name.first }} {{ name.last }}</div>
    <div class="user-location">{{ location.city }}, {{ location.state }}</div>
    <div class="user-email">{{ email }}</div>
</li>`;

                // renderTemplate(userTemplate, json.results);
                populateList(json.results);
            })
    }

    document.addEventListener('DOMContentLoaded', init);
})();