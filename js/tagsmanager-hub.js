require({
    urlArgs: "v=#{Project.AssemblyInfo.Version}#",
    packages: [{
        name: "my",
        location: "./"
    }, {
        name: "components",
        location: "./components"
    }, {
        name: "img",
        location: "../img"
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
        "my/#{Extension.Id}#-hub-app": {
            version: "#{Project.AssemblyInfo.Version}#",
            previewImageUrl: "https://martinsutka.github.io/icongenerator/#dGl0bGU9VGFnTWFuYWdlciZqc29uPXsic2hvd0d1aWRlcyI6dHJ1ZSwiZ8UOU2l6ZSI6MTAwyBFYIjrJDFnFDGljb27HJzE0xg/GJcQKyiNDb2xvciI6IiNmZmMzMTQixzloYWRvd8kcMMUBzRzGWzXIacUUSW50ZW5zaXR5IjozyBl2ZyI6IjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHTIDnZpZXdCb3g9XCIwIDAgMjQgxBY+PHBhdGggZmlsbD1cImN1cnJlbnTlALhcIiBkPVwiTTUuNSA5QTEuNSDEBMQ7MCA3IDcuNc8UxCg2zxQ01yg5bTExLjkxIDIuNThjLjM2xAM1OS44xAYgMS40MmMwIC41NS0uMjIgMS4wNS3HGDFsLTUgNWExLjk5NiDGBsRTMS0yLjgzIDBsLTYuOTnFBUMyxTwyLjA1IDIgMTEuNcYIVjZjMC0xLjExLjg5LTIgMi0yaDVjxB0wxWnGcTQxLjU4em0tMy44Ny01Ljg3bDEtMWw2Ljg3IMQFYy4zN+gAsjfoALJz7ACtOOgArS4zOCDEBWwtMS0xTDIwLjc1IDEzelwiLz485AGyPuQCFHNCYWNrZ3JvdW5kVHJhbnNwYeQBhSI6ZmFsc2UsImLJHlfkAd0iOjE2MMwWSOUB5tEX6QJ9MjTEAiLMHEzEMskhN2TEAtIh6wKPNTXMHvgC3tAi5gLkNMwZQm9yZGVyUmFkaXVzIjo35ALmc0JhZGdl9gD6ZGdlyWdmxQHFZ2RnZeoBNMkhYTBjNTk4yCFUZXh0IjoiyA9Gb8RZIjcwMCAxNnB4IEFyaWFsyB3mAKkyNH0=",
            logoImageUrl: "https://martinsutka.github.io/icongenerator/#dGl0bGU9VGFnTWFuYWdlciZqc29uPXsic2hvd0d1aWRlcyI6dHJ1ZSwiZ8UOU2l6ZSI6NjTIEFgiOjDIDFnFDGljb27GJjc0xg7GJMQKWSI6MsYKQ29sb3IiOiIjZmZjMzE0Isc4aGFkb3fJHDDFAc0cxlo1yGjFFEludGVuc2l0eSI6M8gZdmciOiI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0yA52aWV3Qm94PVwiMCAwIDI0IMQWPjxwYXRoIGZpbGw9XCJjdXJyZW505QC4XCIgZD1cIk01LjUgOUExLjUgxATEOzAgNyA3LjXPFMQoNs8UNNcoOW0xMS45MSAyLjU4Yy4zNsQDNTkuOMQGIDEuNDJjMCAuNTUtLjIyIDEuMDUtxxgxbC01IDVhMS45OTYgxgbEUzEtMi44MyAwbC02Ljk5xQVDMsU8Mi4wNSAyIDExLjXGCFY2YzAtMS4xMS44OS0yIDItMmg1Y8QdMMVpxnE0MS41OHptLTMuODctNS44N2wxLTFsNi44NyDEBWMuMzfoALI36ACyc+wArTjoAK0uMzggxAVsLTEtMUwyMC43NSAxM3pcIi8+POQBsj7kAhRzQmFja2dyb3VuZFRyYW5zcGHkAYUiOmZhbHNlLCJiyR5X5AHdIjoxMjjMFkjlAebRF+kCfTI0xAIizBxMxDLJITdkxALSIesCjzU1zB74At7QIuYC5DTMGUJvcmRlclJhZGl1cyI6NuQC5nNCYWRnZfYA+mRnZclnZsUBxWdkZ2XqATTJIWEwYzU5OMghVGV4dCI6IsgPRm/EWSI3MDAgMTZweCBBcmlhbMgd5gCpMjR9"
        }
    }
}, ["my/#{Extension.Id}#-hub-app"]);