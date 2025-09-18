define([
    "knockout"
], (ko) => {
    //#region [ Constructors ]
    
    /**
     * Constructor.
     * 
     * @param {object} args Arguments.
     */
    const Model = function (args = {}) {
        this.value = ko.isObservable(args.value) ? args.value : ko.observable(args.value || "");
        this.format = typeof(args.format) === "function" ? args.format : (x) => x;
        this.classes = ko.isObservable(args.classes) ? args.classes : ko.observable(args.classes || "");
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Model.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
    };

    //#endregion

    
    //#region [ Template ]

    Model.template =
        `<div class="font-size-m bolt-table-cell-content flex-row flex-center" data-bind="class: classes">
            <div class="flex-row wrap-text">
                <span data-bind="text: format(value())"></span>
            </div>
        </div>`;

    //#endregion


    //#region [ Registration ]

    ko.components.register("my-columntext", {
        template: Model.template,
        viewModel: { 
            createViewModel: (params, componentInfo) => {
                params = params || {};
                params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;
            
                return new Model(params);
            }
        }
    });

    //#endregion
});