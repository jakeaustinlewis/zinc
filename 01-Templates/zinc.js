'use strict';

/* eslint-env browser */

(() => {

    // function populateList(results) {
    //     let userList = document.getElementById("z-user-list");
    //     console.log(results); // eslint-disable-line no-console
    //     for (let i = 0; i < results.length; i++) {

    //         userList.insertAdjacentHTML('beforeend', `
    //         <li class="user">
    //             <img class="user-photo" src="${results[i].picture.medium}" alt="">
    //             <div class="user-name">${results[i].name.first} ${results[i].name.last}</div>
    //             <div class="user-location">${results[i].location.city},  ${results[i].location.state}</div>
    //             <div class="user-email">${results[i].email}</div>
    //         </li>`);

    //     }
    // }

    // function renderTemplate1(userTemplate, data) {
    //     let userList = document.getElementById("z-user-list");
    //     let matchString = /{{\s*(\w+)\s*}}/gm;

    //     let dataMap = data.map(user => ({
    //         photo: user.picture.thumbnail,
    //         firstName: user.name.first,
    //         lastName: user.name.last,
    //         city: user.location.city,
    //         state: user.location.state,
    //         email: user.email

    //     }));
    //     dataMap.forEach(user => {
    //         let userString = userTemplate.replace(matchString, (match, captured) => {
    //             return user[captured];
    //         })
    //         userList.insertAdjacentHTML('afterend', userString);
    //     })
    // }

    function renderTemplate2(userTemplate, data) {
        let userList = document.getElementById("z-user-list");
        let matchString = /{{\s*([\w.]+)\s*}}/gm;
        console.log(data);

        data.forEach(user => {
            userList.insertAdjacentHTML('beforeend', userTemplate.replace(matchString, (match, captured) => {
                return captured.split(".").reduce((acc, curr) => acc[curr], user)
            }))
        })
    }

    function renderTemplate(template, users) {

        fetch(`${template}.html`)
            .then(template => template.text())
            .then(template => {
                let matchString = /{{\s*([\w.]+)\s*}}/g;

                users.forEach((user) => {

                    document.getElementById("z-user-list").insertAdjacentHTML('beforeend', template.replace(matchString, (match, captured) => {
                        let arr = captured.split('.');
                        return arr.reduce((acc, curr) => acc[curr], user);
                    }))
                });
            });
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(data => {
                const userTemplate =
                    `<li class="user">
                        <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
                        <div class="user-name">{{ name.first }} {{ name.last }}</div>
                        <div class="user-location">{{ location.city }}, {{ location.state }}</div>
                        <div class="user-email">{{ email }}</div>
                    </li>`;

                // renderTemplate2(userTemplate, data.results);
                renderTemplate('user', data.results);
            })
    }

    document.addEventListener('DOMContentLoaded', init);
})();