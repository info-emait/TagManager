module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("copy", {
        dependencies: {
            options: {
                process: function (content, srcpath) {
                    var segments = srcpath.split("/");
                    segments.shift();
                    var path = [segments.shift(), segments.pop()].join("/");
                    switch (path.toLowerCase()) {
                        case "azure-devops-ui/fabricicons.css":
                        case "azure-devops-ui/fluenticons.css":
                            return content.replace(/.\/fonts\//gi, "../fonts/");
                        default:
                            return content;
                    }
                },                
                noProcess: ["**/*.{woff,woff2}"]
            },
            files: [{
                expand: true,
                flatten: true,
                cwd: "node_modules/",
                src: [
                    "requirejs/require.js",
                    "azure-devops-extension-sdk/SDK.min.js",
                    "knockout/build/output/knockout-latest.debug.js",
                    "whatwg-fetch/dist/fetch.umd.js"
                ],
                dest: "js/libs/",
                filter: "isFile"
            }, {
                expand: true,
                cwd: "node_modules/azure-devops-extension-api/",
                src: [
                    "**/*.js",
                    "!**/*.min.js"
                ],
                dest: "js/libs/api/",
                filter: "isFile"
            }, {
                expand: true,
                cwd: "node_modules/azure-devops-ui/",
                src: [
                    "Core/core.css",
                    "Core/override.css",
                    "Components/Spinner/Spinner.css",
                    "Components/Menu/Menu.css",
                    "Components/Menu/MenuButton.css",
                    "Components/Button/Button.css",
                    "Components/Button/ExpandableButton.css",
                    "Components/ButtonGroup/ButtonGroup.css",
                    "Components/FormItem/FormItem.css",
                    "Components/Header/Header.css",
                    "Components/TextField/TextField.css",
                    "Components/Page/Page.css",
                    "Components/MessageBar/MessageBar.css",
                    "Components/MessageCard/MessageCard.css",
                    "Components/List/List.css",
                    "Components/ListBox/ListBox.css",
                    "Components/Table/Table.css",
                    "Components/Card/Card.css",
                    "Components/Surface/Surface.css",
                    "Components/ZeroData/ZeroData.css",
                    "Components/Status/Status.css",
                    "Components/PillGroup/PillGroup.css",
                    "Components/Pill/Pill.css",
                    "Components/FilterBar/FilterBar.css",
                    "Components/Filter/Filter.css",
                    "Components/Dropdown/Dropdown.css",
                    "Components/Callout/Callout.css",
                    "Components/Icon/FabricIcons.css",
                    "Components/Icon/FluentIcons.css",
                    "!buildScripts/**",
                    "!node_modules/**",
                    "!**/*.min.js"
                ],
                dest: "js/libs/ui/",
                filter: "isFile"
            }, {
                expand: true,
                cwd: "node_modules/azure-devops-ui/Components/Icon/fonts/",
                src: [
                    "**/*.woff",
                    "**/*.woff2"
                ],
                dest: "fonts/",
                filter: "isFile"
            }]
        },
        img: {
            files: [{
                expand: true,
                cwd: "img/",
                src: ["**"],
                dest: "wwwroot/img/",
                filter: "isFile"
            }]
        },
        html: {
            options: {
                process: function (content, srcpath) {
                    return content
                        .replace(/#\{Project.AssemblyInfo.Version\}#/g, grunt.config("package").version)
                        .replace(/#\{Extension.Id\}#/g, grunt.config("package").name)
                        .replace(/#\{Extension.Publisher\}#/g, grunt.config("package").author);
                }
            },
            files: [{
                expand: true,
                cwd: "html/",
                src: ["**"],
                dest: "wwwroot/html/",
                filter: "isFile"
            }]
        },
        css: {
            files: [{
                expand: true,
                cwd: "css/",
                src: ["**"],
                dest: "wwwroot/css/",
                filter: "isFile"
            }]
        },        
        js: {
            options: {
                process: function (content, srcpath) {
                    return content
                        .replace(/#\{Project.AssemblyInfo.Version\}#/g, grunt.config("package").version)
                        .replace(/#\{Extension.Id\}#/g, grunt.config("package").name)
                        .replace(/#\{Extension.Publisher\}#/g, grunt.config("package").author);
                }
            }, 
            files: [{
                expand: true,
                cwd: "js/",
                src: ["**", "!**/*.less", "!config.*.js"],
                dest: "wwwroot/js/",
                filter: "isFile"
            }]
        },
        fonts: {
            files: [{
                expand: true,
                cwd: "fonts/",
                src: ["**"],
                dest: "wwwroot/fonts/",
                filter: "isFile"
            }]
        },
        md: {
            files: [{
                expand: true,
                cwd: "",
                src: ["License.md", "Overview.md", "Changelog.md"],
                dest: "wwwroot/",
                filter: "isFile"
            }]
        },
        config: {
            options: {
                process: function (content, srcpath) {
                    return content
                        .replace(/#\{Project.AssemblyInfo.Version\}#/g, grunt.config("package").version)
                        .replace(/#\{Extension.Id\}#/g, grunt.config("package").name)
                        .replace(/#\{Extension.Publisher\}#/g, grunt.config("package").author);
                }
            },            
            files: [{
                expand: true,
                src: ["extension.json"],
                cwd: "",
                filter: "isFile",
                rename: function () {
                    return "wwwroot/vss-extension.json";
                }
            }]
        }
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-copy");

    //#endregion
};