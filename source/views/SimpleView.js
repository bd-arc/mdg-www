enyo.kind({
    name: "SimpleView",
    kind: "FittableRows",
    classes: "enyo-fit enyo-unselectable",
    published: {
        collection: ""
    },
    events: {
        onNavBack: "",
        onPushView: "",
        onOpenDialog: "",
        onPushContent: ""
    },
    handlers: {
        onUpdateContent: "updateContent"
    },
    components: [
        {
            kind: "HeaderNavbar",
            name: "navbar"
        },
        {
            name: "gridlist",
            kind: "enyo.DataGridList",
            classes: "gridlist hide",
            fit: true,
            // rowsPerPage: 2,
            // pageSizeMultiplier: 0.5,
            // rowsPerPage: 4,
            minWidth: (enyo.dom.getWindowWidth() > 600) ? 300 : 150,
            minHeight: 150,
            spacing: 0,
            scrollerOptions: {
                horizontal: "hidden",
                touch: true,
                thumb: false
            },
            components: [
                {
                    ontap: "doPushContent",
                    components: [
                        {
                            classes: "gridlist-item",
                            components: [
                                {
                                    classes: "gridlist-infos",
                                    components: [
                                        {
                                            name: "productName",
                                            tag: "h3"
                                        },
                                        {
                                            name: "productTagline",
                                            tag: "p"
                                        },
                                    ]
                                },
                                {
                                    name: "image",
                                    kind: "enyo.Image",
                                    classes: "gridlist-image",
                                    sizing: "cover"
                                }
                            ]
                        }
                    ],
                    bindings: [
                        {
                            from: ".model.productName",
                            to: ".$.productName.content"
                        },
                        {
                            from: ".model.productTagline",
                            to: ".$.productTagline.content"
                        },
                        {
                            from: ".model.url",
                            to: ".$.image.src"
                        }
                    ]
                }
            ]
        },
        {
            kind: "onyx.Toolbar",
            layoutKind: "FittableColumnsLayout",
            classes: "footer-toolbar",
            components: [
                {
                    kind: "onyx.Button",
                    content: "List",
                    ontap: "addView"
                },
                {
                    kind: "onyx.Button",
                    content: "Dialog",
                    ontap: "doOpenDialog"
                },
                {
                    kind: "onyx.Button",
                    content: "Content",
                    ontap: "doPushContent"
                }
            ]
        }
    ],
    bindings: [
        {
            from: ".collection",
            to: ".$.gridlist.collection"
        }
    ],
    create: function() {
        this.inherited(arguments);
        if (this.firstView) {
            this.$.navbar.set("showBack", false);
        }
    },
    updateContent: function(inSender, inEvent) {
        // If we are not going back, update content
        if (!inEvent.fromIndex || (inEvent.fromIndex < inEvent.toIndex)) {
            // WARNING: timeout because onTransitionFinish sometimes fire too soon.
            // The final behaviour will be to load the view first, then to add some content
            setTimeout(enyo.bind(this, function() {
                var random = this.getRandomInt(2, (this.data.length - 1)),
                        data = this.data;

                data.sort(function() {
                    return .5 - Math.random();
                });

                this.set("collection", new enyo.Collection(data.slice(0, random)));
                this.$.gridlist.removeClass("hide");
            }), 500);
        }
        return true;
    },
    addView: function() {
        this.$.navbar.set("loading", true);

        // WARNING: timeout to simulate an AJAX request
        setTimeout(enyo.bind(this, function() {
            this.$.navbar.set("loading", false);
            this.doPushView({
                name: "view"
            });
        }), 1000);
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    data: [
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://dzinetrip.com/wp-content/uploads/2012/04/photography-we-are-sepcial-because-we-are-magic-by-alba+-soler-04.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://www.hanoutkoum.com/images/photos/he9s6i726v.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://ninjaeatsfood.files.wordpress.com/2013/02/beautiful-photography-191.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/african-lions-tanzania_25990_600x450.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/covered-bridge-dale_25992_600x450.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/fishermen-chad_25993_600x450.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://browseideas.com/wp-content/uploads/2012/02/beautiful-pictures-of-rain-photography-02.jpg"
        },
        {
            productName: "Nom du produit et plus",
            productTagline: "Petit texte de présentation",
            url: "http://img.xcitefun.net/users/2011/09/264111,xcitefun-under-waves-of-sea-beautiful-photography.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://www.hanoutkoum.com/images/photos/he9s6i726v.jpg"
        },
        {
            productName: "Nom du produit",
            productTagline: "Petit texte de présentation",
            url: "http://ninjaeatsfood.files.wordpress.com/2013/02/beautiful-photography-191.jpg"
        }
    ]
});

