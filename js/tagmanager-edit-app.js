define([
    "module",
    "require",
    "knockout",
    "sdk"
], (module, require, ko, sdk) => {
    //#region [ Fields ]

    const global = (function () { return this; })();
    const doc = global.document;
    const cnf = module.config();

    //#endregion


    //#region [ Constructors ]
    
    /**
     * Constructor.
     * 
     * @param {object} args Arguments.
     */
    const Model = function (args) {
        console.debug("TagManagerEditApp()");

        this.version = args.version;
        this.tag = args.tag;
        this.message = args.message;
        this.okText = args.okText || "Delete";
        this.cancelText = args.cancelText || "Cancel";
        this.dialog = args.dialog;
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Initialize the application.
     */
    Model.prototype.init = function () {
        return Promise.resolve(true);
    };


    /**
     * Cancels the dialog.
     */
    Model.prototype.cancel = function() {
        this.dialog.close(false);
    };


    /**
     * Confirms the dialog.
     */
    Model.prototype.ok = function() {
        this.dialog.close(true);
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("~TagManagerEditApp()");
    };

    //#endregion


    //#region [ Methods ]

    /**
     * Fires function when DOM is ready.
     *
     * @param {function} fn Function.
     */
    const ready = (fn) => {
        if (doc.attachEvent ? (doc.readyState === "complete") : (doc.readyState !== "loading")) {
            fn();
            return;
        }

        doc.addEventListener("DOMContentLoaded", fn);
    };

    //#endregion


    //#region [ Start ]

    ready(function () {
        sdk.init({                        
            loaded: false,
            applyTheme: true
        });

        sdk.ready()
            .then(() => {
                const config = sdk.getConfiguration();
                sdk.resize(undefined, config.height || 240);

                // Create application model
                const model = new Model({
                    version: cnf.version,
                    tag: config.tag,
                    message: config.message,
                    dialog: config.dialog,
                    okText: config.okText,
                    cancelText: config.cancelText
                });
                console.debug("TagManagerEditApp : ready() : %o", model);
                
                // Register dialog
                sdk.register("#{Extension.Id}#-edit", () => model);

                // Start application and init application
                ko.applyBindings(model, doc.body);
                sdk.notifyLoadSucceeded();
                model.init().then(() => console.debug("Tag Manager edit is running."));
            });
    });

    //#endregion
});