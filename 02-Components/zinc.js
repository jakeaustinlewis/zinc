'use strict';

/* eslint-env browser */

const Zinc = {};



(() => {

    function reviewStackUserList() {
        let elements = Array.from(document.getElementsByTagName('user-list'));
        if(elements){
            Zinc.registerComponent({
                name: 'user-list',
                templateFile: 'userlist',
                data: user,
                controller: hilight,
            });
            renderComponents(Zinc.components);
        }
    }
    function reviewStackUserInfo() {
        let elements = Array.from(document.getElementsByTagName('user-info'));
        if(elements){
            Zinc.registerComponent({
                name: 'user-list',
                templateFile: 'userlist',
                data: user,
                controller: hilight,
            });
            renderComponents(Zinc.components);
        }
    }
    function hilight() {
                            
            this.firstElementChild.classList.toggle('hilight');
            // event.currentTarget.classList.toggle('hilight');
    }

    // Zinc.registerComponent = function (elementName, templateFile, dataObject, controller) {
        Zinc.registerComponent = function(configObj) {
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
        console.log(elements);


        fetch(`${content}.html`)
            .then(content => content.text())
            .then((content) => {

                elements.forEach(element => {

                    let regEx = /{{\s*([\w.]+)\s*}}/g;
                    let HTML = content.replace(regEx, (match, templateValue) => {
                        let templateValueArr = templateValue.split('.');
                        return templateValueArr.reduce((acc, curr) => acc[curr], data)
                    })

                    console.log(Array.from(element.children));
                    element.addEventListener('click', controller);
                    element.insertAdjacentHTML('beforeend', HTML);
                    reviewStackUserList();
                    reviewStackUserInfo()
                })
            })
    }

    // passing components = Zinc.components
    function renderComponents(components) {
        // looping through the keys and values of components object
        for (let component in components) {

            //passing content in object to function to render components (put content in html) 
            renderComponent1(
                components[component].name,
                components[component].templateFile,
                components[component].data,
                components[component].controller
            )
        }
    }

    function init() {

        fetch('https://randomuser.me/api/?results=3')
            .then(res => res.json())
            .then(data => {
                data.results.forEach(user => {

                    Zinc.registerComponent({
                        name: 'user-list',
                        templateFile: 'userlist',
                        data: user,
                        controller: hilight,
                    });
                    renderComponents(Zinc.components);
                })

                data.results.forEach(user => {

                    Zinc.registerComponent({
                        name: 'user-info',
                        templateFile: 'user',
                        data: user,
                        controller: hilight,
                    });
                    renderComponents(Zinc.components);
                })
            })
    }

    document.addEventListener('DOMContentLoaded', init);
})();