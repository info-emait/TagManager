module.exports = function (grunt) {
    //#region [ Configuration ]

    grunt.config("less", {
        options: {
            paths: ["less"],
            strictMath: false,            
            customFunctions: {
                rem: (less, fontsize) => {
                    if (less.functions.functionRegistry.get("ispixel")) {
                        return fontsize.value / 16 + "rem";
                    }
                },
                shadow: (less, color, bgcolor, len) => {
                    let length = len.value;
                    let total = length;
                    let amount = null;
                    let mixed = null;
                    let mix = less.functions.functionRegistry.get("mix");
                    let result = [(color.value || color.toCSS()) + " 0px 0px"];

                    while (length > 0) {
                        amount = 100 - ((length / total) * 100);
                        mixed = mix(color, bgcolor, { value: amount });
                        result.unshift(mixed.toCSS() + " " + length + "px " + length + "px");
                        length--;
                    }

                    return result.join(",");
                }
            }
        },
        src: {
            files: {
                "wwwroot/css/tagmanager-hub.css": "less/tagmanager-hub.less"
            }
        }
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-less");

    //#endregion
};