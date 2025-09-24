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
                "wwwroot/css/tagsmanager-hub.css": "less/tagsmanager-hub.less",
                "wwwroot/css/tagsmanager-confirm.css": "less/tagsmanager-confirm.less",
                "wwwroot/css/tagsmanager-edit.css": "less/tagsmanager-edit.less",
                "wwwroot/css/tagsmanager-merge.css": "less/tagsmanager-merge.less"
            }
        }
    });

    //#endregion


    //#region [ Tasks ]

    grunt.loadNpmTasks("grunt-contrib-less");

    //#endregion
};