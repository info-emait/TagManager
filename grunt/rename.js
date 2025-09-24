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
                { src: ["wwwroot/css/tagsmanager-hub.min.css"], dest: "wwwroot/css/tagsmanager-hub.css" },
                { src: ["wwwroot/css/tagsmanager-confirm.min.css"], dest: "wwwroot/css/tagsmanager-confirm.css" },
                { src: ["wwwroot/css/tagsmanager-edit.min.css"], dest: "wwwroot/css/tagsmanager-edit.css" },
                { src: ["wwwroot/css/tagsmanager-merge.min.css"], dest: "wwwroot/css/tagsmanager-merge.css" },
                { src: ["wwwroot/css/azure-devops-ui.min.css"], dest: "wwwroot/css/azure-devops-ui.css" }
            ]
        }
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-rename-util");

    //#endregion
};