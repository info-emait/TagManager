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
        console.debug("Input()");

        this.type = args.type || "text";
        this.tabindex = args.tabindex || 0;
        this.min = typeof(args.min) === "number" ? args.min : null;
        this.max = typeof(args.max) === "number" ? args.max : null;
        this.value = ko.isObservable(args.value) ? args.value : ko.observable(args.value || "");
        this.options = ko.isObservable(args.options) ? args.options : ko.observable(args.options || []);
        this.optionsText = typeof(args.optionsText) === "string" ? args.optionsText : "";
        this.optionsValue = typeof(args.optionsValue) === "string" ? args.optionsValue : "";
        this.optionsCaption = typeof(args.optionsCaption) === "string" ? args.optionsCaption : null;
        this.optionsInfo = typeof(args.optionsInfo) === "string" ? args.optionsInfo : "";
        this.label = ko.isObservable(args.label) ? args.label : ko.observable(args.label || "");
        this.info = ko.isObservable(args.info) ? args.info : ko.observable(args.info || "");
        this.error = ko.isObservable(args.error) ? args.error : ko.observable(args.error || "");
        this.classes = ko.isObservable(args.classes) ? args.classes : ko.observable(args.classes || "");

        this.optionsInfoValue = ko.computed(function() {
            const type = this.type;
            const optionsInfo = this.optionsInfo || "";
            const optionsValue = this.optionsValue || "";
            const options = this.options();
            const value = this.value();

            if ((type !== "select") || !optionsInfo.length || !optionsValue.length || !options.length) {
                return "";
            }

            const obj = options.find((o) => o[optionsValue] == value);
            if (obj) {
                return obj[optionsInfo] || "";
            }

            return "";
        }, this);
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
        console.log("~Input()");

        this.optionsInfoValue.dispose();
    };

    //#endregion

    
    //#region [ Template ]

    Model.template =
        `<div class="flex-column full-width">
            <label class="bolt-formitem-label body-m" data-bind="html: label"></label>
            <div class="flex-column">
                <div class="bolt-textfield bolt-textfield-default-width flex-row flex-center focus-treatment"
                        data-bind="css: { 'bolt-textfield-error': error().length },
                                   class: classes">
                    <!-- ko ifnot: type === 'select' -->
                    <input autocomplete="off" class="bolt-textfield-input flex-grow"
                            data-bind="attr: { 
                                            type: type,
                                            tabindex: tabindex,
                                            min: min,
                                            max: max
                                       },
                                       textInput: value,
                                       css: { 
                                            'bolt-textfield-input-with-suffix': error().length 
                                       }" />
                    <!-- /ko -->
                    <!-- ko if: type === 'select' -->
                    <select class="bolt-textfield-input flex-grow"
                            data-bind="attr: { 
                                            tabindex: tabindex
                                       },
                                       options: options,
                                       optionsText: optionsText,
                                       optionsValue: optionsValue,
                                       optionsCaption: optionsCaption,
                                       value: value,
                                       css: { 
                                            'bolt-textfield-input-with-suffix': error().length
                                       }"></select>
                    <!-- /ko -->
                    <!-- ko if: error().length -->
                    <span class="fluent-icons-enabled">
                        <span aria-hidden="true" class="bolt-textfield-message-error suffix bolt-textfield-icon flex-noshrink fabric-icon ms-Icon--Error medium"></span>
                    </span>
                    <!-- /ko -->
                </div>
            </div>
            <!-- ko if: info().length -->
            <span class="bolt-formitem-message body-xs" data-bind="html: info"></span>
            <!-- /ko -->
            <!-- ko if: optionsInfoValue().length -->
            <span class="bolt-formitem-message body-xs" data-bind="text: optionsInfoValue"></span>
            <!-- /ko -->
            <!-- ko if: error().length -->
            <span class="bolt-formitem-message body-xs bolt-formitem-message-error" role="alert" data-bind="html: error"></span>
            <!-- /ko -->
        </div>`;

    //#endregion


    //#region [ Registration ]

    ko.components.register("my-input", {
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