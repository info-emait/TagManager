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
        console.debug("Header()");

        this.text = ko.isObservable(args.text) ? args.text : ko.observable(args.text || "");
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
        console.log("~Header()");
    };

    //#endregion

    
    //#region [ Template ]

    Model.template =
        `<div class="bolt-header flex-row flex-noshrink flex-start bolt-header-no-spacing-defined">
            <div class="bolt-header-content-area flex-row flex-grow flex-self-stretch">
                <div class="bolt-header-title-area flex-column flex-grow scroll-hidden">
                    <div class="bolt-header-title-row flex-row flex-baseline">
                        <div aria-level="1" class="bolt-header-title title-m l" role="heading" data-bind="text: text"></div>
                    </div>
                </div>
            </div>
        </div>`;

    //#endregion


    //#region [ Registration ]

    ko.components.register("my-header", {
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