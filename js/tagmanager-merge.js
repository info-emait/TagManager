require({
    urlArgs: "v=#{Project.AssemblyInfo.Version}#",
    packages: [{
        name: "my",
        location: "./"
    }],
    paths: {
        "knockout": "./libs/knockout",
        "whatwg-fetch": "./libs/whatwg-fetch",
        "sdk": "./libs/sdk",
        "api": "./libs/api"
    },
    map: {
        "*": {
            "azure-devops-extension-sdk": "sdk"
        }
    },
    config: {
        "my/#{Extension.Id}#-merge-app": {
            version: "#{Project.AssemblyInfo.Version}#"
        }
    }
}, ["my/#{Extension.Id}#-merge-app"]);