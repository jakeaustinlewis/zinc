'use strict';

/* eslint-env browser */

const Zinc = {};



(() => {

    function hilight() {
            console.log(this);
                            
            this.firstElementChild.classList.toggle('hilight');
            // event.currentTarget.classList.toggle('hilight');

            console.log('click');
    }

    // Zinc.registerComponent = function (elementName, templateFile, dataObject, controller) {
        Zinc.registerComponent = function (configObj) {
        if (!Zinc.components) {
            Zinc.components = {};
        }

        Zinc.components[configObj.name] = {
            name: configObj.name,
            templateFile: configObj.templateFile,
            data: configObj.data,
            controller: configObj.controller
        };
    }

    function renderComponent1(element, content, data, controller) {
        let elements = Array.from(document.getElementsByTagName(element));
        console.log(element, content, data, controller);

        fetch(`${content}.html`)
            .then(content => content.text())
            .then((content) => {

                elements.forEach(element => {

                    let regEx = /{{\s*([\w.]+)\s*}}/g;
                    let HTML = content.replace(regEx, (match, templateValue) => {
                        let templateValueArr = templateValue.split('.');
                        return templateValueArr.reduce((acc, curr) => acc[curr], data)
                    })

                    element.addEventListener('click', controller);
                    element.insertAdjacentHTML('beforeend', HTML);
                })
            })
    }

    // passing components = Zinc.components
    function renderComponents(components) {
        console.log(components);
        // looping through the keys and values of components object
        for (let component in components) {

            //passing content in object to function to render components (put content in html) 
            renderComponent1(

                components[component].name,
                components[component].templateFile,
                components[component].data,
                components[component].controller)
        }
    }

    function init() {
        // Zinc.registerComponent('user-item', 'user', Zinc.userData, controller);
        // renderComponents(Zinc.components);

        fetch('https://randomuser.me/api/?results=1')
            .then(res => res.json())
            .then(data => {
                data.results.forEach(user => {

                    Zinc.registerComponent({
                        name: 'user-item',
                        templateFile: 'user',
                        data: user,
                        controller: hilight,
                        // ... and so on
                    });
                    renderComponents(Zinc.components);
                })
            })



        // renderTemplate2(userTemplate, data.results);
        // renderTemplate('user', data.results);



    }

    document.addEventListener('DOMContentLoaded', init);
})();