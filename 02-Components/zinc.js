'use strict';

/* eslint-env browser */

const Zinc = {};


(() => {


    function renderComponent1(element, content, userData) {

        fetch(`user.html`)
        .then(template => template.text())
        .then(template => {
            let matchString = /{{\s*([\w.]+)\s*}}/g;

            let user = template.replace(matchString, (match, captured) => {
                let arr = captured.split('.');
                return arr.reduce((acc, curr) => acc[curr], userData);
            })
            document.getElementsByTagName('user-item')[0].insertAdjacentHTML('beforeend', user);
        });
    }

    function init() {
        renderComponent1('user-item', 'user', Zinc.userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
