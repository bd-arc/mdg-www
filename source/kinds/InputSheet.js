
enyo.kind({
    name: "InputSheet",
    kind: "Slideable",
    classes: "enyo-fit sheet",
    draggable: false,
    overMoving: false,
    preventDragPropagation: true,
    axis: "v",
    unit: "%",
    min: 0,
    max: 100,
    value: 100,
    destroyOnDisappearance: false,
    handlers: {
        "onAnimateFinish": "destroySheet"
    },
    components: [
        {
            kind: "FittableRows",
            classes: "enyo-fit",
            components: [
                {
                    kind: "onyx.Toolbar",
                    components: [
                        {
                            tag: "p",
                            content: "Inputs"
                        },
                        {
                            tag: "div",
                            classes: "toolbar-btn btn-sheet-close",
                            ontap: "hideSheet"
                        }
                    ]
                },
                {
                    kind: "enyo.Input",
                    type: "search",
                    classes: "app-input",
                    placeholder: "Rechercher...",
                    selectOnFocus: true
                },
                {
                    kind: "enyo.Scroller",
                    fit: true,
                    touch: true,
                    thumb: false,
                    horizontal: "hidden",
                    // classes: "enyo-fit",
                    components: [
                        {
                            classes: "app-section",
                            components: [
                                {
                                    kind: "enyo.Input",
                                    type: "text",
                                    classes: "app-input",
                                    placeholder: "Champ texte...",
                                    selectOnFocus: true
                                }
                            ]
                        },
                        {
                            tag: "form",
                            classes: "app-section",
                            components: [
                                {
                                    kind: "enyo.Input",
                                    type: "text",
                                    classes: "app-input",
                                    placeholder: "Sujet...",
                                    selectOnFocus: true
                                },
                                {
                                    kind: "enyo.TextArea",
                                    type: "text",
                                    classes: "app-input",
                                    placeholder: "Message...",
                                    selectOnFocus: true
                                },
                                {
                                    classes: "app-button dark",
                                    content: "Envoyer",
                                    ontap: "hideSheet"
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: "section",
                    classes: "diagonal-divider",
                    components: [
                        {
                            tag: "a",
                            classes: "welcome-title",
                            content: "Bienvenue",
                            ontap: "hideSheet"
                        }
                    ]
                }
            ]
        }
    ],
    showSheet: function(inSender, inEvent) {
        if (this.hasNode()) {
            $(this.node).find('input, textarea').each(function() {
                this.disabled = false;
            });

            this.animateToMin();
        }

        return true;
    },
    hideSheet: function(inSender, inEvent) {
        if (this.hasNode()) {
            $(this.node).find('input, textarea').each(function() {
                this.disabled = true;
            });

            this.animateToMax();
        }

        return true;
    },
    destroySheet: function() {
        if (this.destroyOnDisappearance) {
            this.destroy();
        }
    }
});
