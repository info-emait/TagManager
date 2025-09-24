define([
    "module",
    "require",
    "knockout",
    "sdk",
    "services/data",
    "components/input"
], (module, require, ko, sdk, data) => {
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
        console.debug("TagsManagerEditApp()");

        this.version = args.version;
        this.okText = args.okText || "Delete";
        this.cancelText = args.cancelText || "Cancel";
        this.dialog = args.dialog;

        this.id = args.id;
        this.url = args.url;
        this.name = ko.observable(args.name);
        this.nameError = ko.observable("");
        this.description = ko.observable(args.description || "");
        this.descriptionError = ko.observable("");
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
     * Validates form before sending.
     */
    Model.prototype.isValid = function() {
        this.nameError(!this.name() || !this.name().length ? "Name is required" : "");

        return !this.nameError().length;
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
        if (!this.isValid()) {
            this.resize();
            return;
        }
        
        this.dialog.close({
            id: this.id,
            url: this.url,
            name: this.name(),
            description: this.description()
        });
    };


    /**
     * Resizes the dialog.
     */
    Model.prototype.resize = function () {
        setTimeout(() => {
            const view = doc.querySelector(".tagsmanager-edit");
            sdk.resize(440, Math.max(view.offsetHeight, view.scrollHeight));
        }, 1);
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("~TagsManagerEditApp()");
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
            .then(() => data.getManager())
            .then((manager) => manager.getValue("tags"))
            .then((settings) => {
                const config = sdk.getConfiguration();
                sdk.resize(undefined, config.height || 240);

                let tag = null;
                if (settings) {
                    try {
                        const parsed = JSON.parse(settings);
                        if (Array.isArray(parsed.tags)) {
                            tag = parsed.tags.find((t) => t.id === config.tag.id);
                        }
                    } 
                    catch (error) {}
                }

                // Create application model
                const model = new Model({
                    version: cnf.version,
                    id: config.tag.id,
                    name: config.tag.name,
                    description: (tag || {}).description || "",
                    url: config.tag.url,
                    dialog: config.dialog,
                    okText: config.okText,
                    cancelText: config.cancelText
                });
                console.debug("TagsManagerEditApp : ready() : %o", model);
                
                // Register dialog
                sdk.register("#{Extension.Id}#-edit", () => model);

                // Start application and init application
                ko.applyBindings(model, doc.body);
                sdk.notifyLoadSucceeded();
                model.init().then(() => console.debug("Tags Manager edit is running."));
            });
    });

    //#endregion
});