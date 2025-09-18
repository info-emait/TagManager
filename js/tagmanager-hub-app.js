define([
    "module",
    "require",
    "knockout",
    "sdk",
    "api/index",
    "api/WorkItemTracking/index",
    "components/header",
    "components/zerodata",
    "components/column-text"
], (module, require, ko, sdk, api, witApi) => {
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
        console.debug("TagManagerHubApp()");

        this.version = args.version;
        this.user = args.user;
        this.project = args.project;

        this.token = null;
        this.path = null;

        this.isLoading = ko.observable(true);
        this.zero = ko.observable(null);
        this.tags = ko.observableArray([]);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Initialize the application.
     */
    Model.prototype.init = function () {
        const client = api.getClient(witApi.WorkItemTrackingRestClient);

        return client._options.rootPath.then((path) => {
                this.path = path;
                return sdk.getAccessToken();
            })
            .then((token) => {
                this.token = token;
                return fetch(`${this.path}${this.project.id}/_apis/wit/tags?${new URLSearchParams({ "api-version": "7.0" })}`, this._getFetchParams()).then((response) => response.ok ? response.json() : null);
            })
            .then((tags) => {
                if (!tags.count || !tags.value.length) {
                    this.zero({ title: "Missing tags", text: "There are not any tags in this project." });
                    return;
                }

                tags.value.forEach((t) => t.count = ko.observable(""));
                this.tags(tags.value);

                const client = api.getClient(witApi.WorkItemTrackingRestClient);
                return Promise.all(tags.value.map((t) => client.queryByWiql({ query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = @Project and [System.Tags] CONTAINS '${t.name}'` }, this.project.id)));
            })
            .then((response) => {
                response.forEach((r, i) => this.tags()[i].count(r.workItems.length));
            });
    };


    /**
     * Opens URL in the new window.
     * 
     * @param {string} url Url address.
     */
    Model.prototype.openNewWindow = function (url) {
        sdk.getService(api.CommonServiceIds.HostNavigationService).then((service) => service.openNewWindow(url));
    };


    /**
     * Open query for work items whith selected tag.
     * 
     * @param {object} tag Tag.
     */
    Model.prototype.queryWorkItems = function (tag) {
        this.openNewWindow(`${this.path}${this.project.name}/_workitems?${new URLSearchParams({ 
            "_a": "query",
            "wiql": `SELECT [System.Id], [System.WorkItemType], [System.Title], [System.Tags] FROM WorkItems where [System.TeamProject] = '${this.project.name}' AND [System.Tags] contains '${tag.name}'`
        })}`);
    };


    /**
     * Deletes tag.
     * 
     * @param {object} tag Tag.
     */
    Model.prototype.deleteTag = function (tag) {
        sdk.getService(api.CommonServiceIds.HostPageLayoutService).then((service) => {
            service.openCustomDialog(`${sdk.getExtensionContext().id}.#{Extension.Id}#-confirm`, {
                title: "Delete tag",
                lightDismiss: false,
                configuration: {
                    tag: tag,
                    message: `Do you want to delete the tag&nbsp;<b>${tag.name}</b>?`,
                    height: 100,
                    okText: "Delete",
                    cancelText: "Cancel"
                },
                onClose: (result) => {
                    console.warn("result: ", result);

                    if (!result) {
                        return;
                    }
                }
            });
        });
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("~TagManagerHubApp()");
    };

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Returns params for fetch calls.
     * 
     * @param {string} method Url method.
     */
    Model.prototype._getFetchParams = function (method = "GET") {
        return {
            method: `${method}`,
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        };
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

    ready(() => {
        sdk.init({                        
            loaded: false,
            applyTheme: true
        });

        sdk.ready()
            .then(() => Promise.all([
                sdk.getService(api.CommonServiceIds.ProjectPageService)
            ]))
            .then((response) => ({ projectService: response[0] }))
            .then(({ projectService }) => Promise.all([
                projectService.getProject()
            ]))
            .then((response) => ({ project: response[0] }))
            .then(({ project }) => {
                // Create application model
                const model = new Model({
                    version: cnf.version,
                    user: sdk.getUser(),
                    project: project
                });
                console.debug("TagManagerHubApp : ready() : %o", model);
                
                // Register hub
                sdk.register("#{Extension.Id}#-hub", () => model);

                // Start application and init application
                ko.applyBindings(model, doc.body);
                sdk.notifyLoadSucceeded();
                model.init().then(() => {
                    model.isLoading(false);
                    console.debug("TagManagerHubApp is running.");
                });
        });
    });

    //#endregion
});