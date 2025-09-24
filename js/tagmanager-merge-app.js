define([
    "module",
    "require",
    "knockout",
    "sdk",
    "components/input"
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
        console.debug("TagManagerMergeApp()");

        this.version = args.version;
        this.okText = args.okText || "Delete";
        this.cancelText = args.cancelText || "Cancel";
        this.dialog = args.dialog;

        this.id = args.id;
        this.tags = args.tags;
        this.targetId = ko.observable();
        this.targetIdError = ko.observable("");
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
        this.targetIdError(!this.targetId() || !this.targetId().length ? "You have to select the target tag" : "");

        return !this.targetIdError().length;
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
            target: this.tags.find((t) => t.id === this.targetId())
        });
    };


    /**
     * Resizes the dialog.
     */
    Model.prototype.resize = function () {
        setTimeout(() => {
            const view = doc.querySelector(".tagmanager-merge");
            sdk.resize(440, Math.max(view.offsetHeight, view.scrollHeight));
        }, 1);
    };    


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("~TagManagerMergeApp()");
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
                    id: config.source.id,
                    tags: config.target,
                    dialog: config.dialog,
                    okText: config.okText,
                    cancelText: config.cancelText
                });
                console.debug("TagManagerMergeApp : ready() : %o", model);
                
                // Register dialog
                sdk.register("#{Extension.Id}#-merge", () => model);

                // Start application and init application
                ko.applyBindings(model, doc.body);
                sdk.notifyLoadSucceeded();
                model.init().then(() => console.debug("Tag Manager merge is running."));
            });
    });

    //#endregion
});