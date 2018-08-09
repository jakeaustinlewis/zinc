'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

    function reviewStackLine(parentNode) {
        console.log('parentNode: ', parentNode);
        console.log('ChildNodes: ', parentNode.childNodes);
        if (parentNode.childNodes.length === 0) {
            return;
        } else {
            Array.from(parentNode.childNodes).forEach(child => {
                if (child.tagName !== undefined) {
                    let currentComponent = Zinc.components[child.tagName.toLowerCase()];
                    if (currentComponent) {
                        // console.log(currentComponent);
                        renderComponent1(currentComponent);
                    } else {
                        reviewStackLine(child);
                    }
                }
            })
            return;
        }
    }

    function hilight() {

        this.firstElementChild.classList.toggle('hilight');

    }

    // add tagname, templatefile, API data, and controller information to object
    Zinc.registerComponent = function (configObj) {

        if (!Zinc.components) {
            Zinc.components = {};
        }
        Zinc.components[configObj.name] = configObj;
    }



    function renderComponent1(component) {

        fetch(`${component.templateFile}.html`)
            .then(content => content.text())
            .then((content) => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(content, "text/html");
                let newNode = doc.body.firstChild;
                let elements = Array.from(newNode.querySelectorAll(component.name));

                reviewStackLine(newNode);


                // elements.forEach(element => {

                //     let regEx = /{{\s*([\w.]+)\s*}}/g;
                //     let HTML = content.replace(regEx, (match, templateValue) => {
                //         let templateValueArr = templateValue.split('.');
                //         return templateValueArr.reduce((acc, curr) => acc[curr], component.data)
                //     })

                //     element.addEventListener('click', component.controller);
                //     element.insertAdjacentHTML('beforeend', HTML);

                //     reviewStackLine(element);
                // })

            })
    }

    // passing components = Zinc.components
    function renderComponents(components) {
        // looping through the keys and values of components object
        for (let component in components) {

            //passing content in object to function to render components (put content in html) 
            renderComponent1(
                components[component]
            )
        }
    }

    function init() {

        Zinc.registerComponent({
            name: 'user-list',
            templateFile: 'userlist'
        });


        fetch('https://randomuser.me/api/?results=3')
            .then(res => res.json())
            .then(data => {
                data.results.forEach((user, index) => {

                    Zinc.registerComponent({
                        name: `user-info${index}`,
                        templateFile: 'user',
                        data: user,
                        controller: hilight
                    });


                })
                renderComponents(Zinc.components);
            })
    }

    document.addEventListener('DOMContentLoaded', init);
})();