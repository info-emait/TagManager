module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("rename", {
        dependencies: {
            files: [
                { src: ["js/libs/SDK.min.js"], dest: "js/libs/sdk.js" },
                { src: ["js/libs/knockout-latest.debug.js"], dest: "js/libs/knockout.js" },
                { src: ["js/libs/fetch.umd.js"], dest: "js/libs/whatwg-fetch.js" }
            ]
        },
        cssmin: {
            files: [
                { src: ["wwwroot/css/tagmanager-hub.min.css"], dest: "wwwroot/css/tagmanager-hub.css" },
                { src: ["wwwroot/css/azure-devops-ui.min.css"], dest: "wwwroot/css/azure-devops-ui.css" }
            ]
        }
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-rename-util");

    //#endregion
};