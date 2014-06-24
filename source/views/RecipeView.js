enyo.kind({
    name: "RecipeView",
    kind: "FittableRows",
    classes: "enyo-fit recipeview",
    published: {
        previewSource: "",
        ingredientsSource: "",
        preparationSource: ""
    },
    components: [
        {
            kind: "ContentHeaderNavbar",
            name: "navbar"
        },
        {
            kind: "Image",
            name: "image",
            classes: "recipeview-image enyo-fit",
            sizing: "cover"
        },
        {
            kind: "onyx.RadioGroup",
            name: "tabs",
            classes: "recipeview-tabs",
            onActivate: "changeCurrentTab",
            components: [
                {
                    content: "Aperçu",
                    active: true
                },
                {
                    content: "Ingrédients"
                },
                {
                    content: "Préparation"
                }
            ]
        },
        {
            kind: "Panels",
            name: "detailsPanels",
            arrangerKind: "CardArranger",
            fit: true,
            draggable: true,
            onTransitionFinish: "updateTabs",
            components: [
                {
                    kind: "Scroller",
                    name: "previewView",
                    classes: "enyo-fit",
                    horizontal: "hidden",
                    touch: true,
                    // onScroll: "parallax",
                    components: [
                        {
                            name: "previewContent",
                            classes: "recipeview-details no-padding",
                            allowHtml: true,
                            components: [
                                {
                                    classes: "recipeview-details-preview-title",
                                    components: [
                                        {
                                            tag: "h4",
                                            content: "par Virginie Montfort"
                                        },
                                        {
                                            tag: "h3",
                                            content: "Gratin de brandade du Gard"
                                        }
                                    ]
                                },
                                {
                                    classes: "recipeview-details-preview-infos",
                                    components: [
                                        {
                                            tag: "p",
                                            allowHtml: true,
                                            content: "Couverts <span>4</span>"
                                        },
                                        {
                                            tag: "p",
                                            allowHtml: true,
                                            content: "Préparation <span>20 min</span>"
                                        },
                                        {
                                            tag: "p",
                                            allowHtml: true,
                                            content: "Cuisson <span>30 min</span>"
                                        }
                                    ]
                                },
                                {
                                    tag: "p",
                                    classes: "recipeview-details-preview-summary",
                                    content: "Une délicieuse recette à servir lors d'un dîner entre amis. Ut convallis vestibulum tortor tincidunt imperdiet. Donec vitae posuere velit, vel vulputate nisl. Aliquam facilisis enim nec mi vulputate fermentum in in ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean ut enim vel mauris sagittis hendrerit et quis est. Cras sed aliquet arcu, ut vehicula sapien. Sed vitae sapien risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                                }
                            ]
                        }
                    ]
                },
                {
                    kind: "Scroller",
                    name: "ingredientsView",
                    classes: "enyo-fit",
                    horizontal: "hidden",
                    touch: true,
                    // onScroll: "parallax",
                    components: [
                        {
                            name: "ingredientsContent",
                            classes: "recipeview-details no-padding",
                            components: [
                                {
                                    kind: "Repeater",
                                    name: "ingredientsRepeater",
                                    onSetupItem: "populateIngredients",
                                    components: [
                                        {
                                            name: "item",
                                            classes: "ingredient clearfix",
                                            ontap: "toggleActiveClass",
                                            components: [
                                                {
                                                    name: "checkbox",
                                                    classes: "ingredient-checkbox"
                                                },
                                                {
                                                    name: "ingredientName",
                                                    tag: "p",
                                                    classes: "ingredient-name",
                                                    allowHtml: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    kind: "Scroller",
                    name: "preparationView",
                    classes: "enyo-fit",
                    horizontal: "hidden",
                    touch: true,
                    // onScroll: "parallax",
                    components: [
                        {
                            kind: "BlocksMasonry",
                            classes: "recipeview-details"
                        }
                    ]
                }
            ]
        }
    ],
    imgSrc: [
        "http://www.jocelynmathewesphotography.com/wp-content/uploads/2013/07/2013-food-photography-johnson-city-tennessee-pomegranate-004.jpg",
        "http://www.spiciefoodie.com/blogimages/2012/12/ChickenShawarma02.jpg",
        "http://4.bp.blogspot.com/_L9Je34Cc0ks/S8nRPH8cVoI/AAAAAAAACDQ/ox6S3mAZdA0/s640/Varillas_2.JPG",
        "http://1.bp.blogspot.com/-QGk_FlaV-wc/TqBPD1TlesI/AAAAAAAACn8/Kbx-MtBQbGE/s1600/IMG_6763.JPG",
        "http://www.nourishedbalance.com/wp-content/uploads/2014/02/140226_nourishedbalance_007_web.jpg",
        "http://abeautifulmess.typepad.com/.a/6a00d8358081ff69e20176163b4fe9970c-800wi"
    ],
    create: function() {
        this.inherited(arguments);
        this.addClass("dark");
        this.$.navbar.set("header", "Recette");
        this.$.navbar.set("showBack", enyo.Panels.isScreenNarrow());
        this.$.navbar.set("showFullscreen", !enyo.Panels.isScreenNarrow());
        this.$.image.set("src", this.imgSrc[this.getRandomInt(0, this.imgSrc.length - 1)]);

        this.$.ingredientsRepeater.set("count", this.getRandomInt(10, 20));
    },
    previewSourceChanged: function() {
        this.$.previewView.setContent(this.get("previewSource"));
    },
    ingredientsSourceChanged: function() {
        this.$.ingredientsView.setContent(this.get("ingredientsSource"));
    },
    preparationSourceChanged: function() {
        this.$.preparationView.setContent(this.get("preparationSource"));
    },
    changeCurrentTab: function(inSender, inEvent) {
        if (inEvent.originator.active) {
            this.$.detailsPanels.setIndex(inEvent.originator.indexInContainer());
        }
    },
    updateTabs: function(inSender, inEvent) {
        this.$.tabs.setActive(this.$.tabs.children[inEvent.toIndex]);
    },
    updateBackground: function(index) {
        if (index === 0) {
            this.addClass("dark");
        } else {
            this.removeClass("dark");
        }
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    i: 0,
    resizeHandler: function(inSender, inEvent) {
        // WARNING: 'onresize' is called 3 times!
        // And it is triggered when clicking the back button
        this.i++;
        this.log('resize: ' + this.i);

        this.$.navbar.set("showBack", enyo.Panels.isScreenNarrow());
        this.$.navbar.set("showFullscreen", !enyo.Panels.isScreenNarrow());

        setTimeout(enyo.bind(this, function() {
            this.reflow();
        }), 0);
    },
    toggleActiveClass: function(inSender, inEvent) {
        var activeClass = "active";
        if (inEvent.originator.name === "item") {
            inEvent.originator.addRemoveClass(activeClass, !inEvent.originator.hasClass(activeClass));
        } else {
            inEvent.originator.parent.addRemoveClass(activeClass, !inEvent.originator.parent.hasClass(activeClass));
        }
    },
    populateIngredients: function(inSender, inEvent) {
        var index = inEvent.index,
                item = inEvent.item,
                ingredients = [
                    "Brandade de morue",
                    "Gousses d’ail écrasées",
                    "Boites de lait de coco ",
                    "Mangue coupée en gros morceaux",
                    "Graines de fenouil",
                    "Poudre de curcuma",
                    "Macis ou muscade râpée",
                    "Oignons doux des Cévennes "
                ],
                quantities = [
                    "600 g",
                    "200 ml",
                    "3",
                    "1 cc",
                    "2 cs",
                    "5"
                ],
                ingredient = ingredients[this.getRandomInt(0, (ingredients.length - 1))],
                quantity = quantities[this.getRandomInt(0, (quantities.length - 1))];


        item.$.ingredientName.setContent(ingredient + " <span>" + quantity + "</span>");
    },
    // Configures the scroll position of the specified component to allow parallax scrolling
    parallax: function(inSender, inEvent) {
        var y = -(inSender.getScrollTop() / 3);
        // console.log(this.$.image.node.offsetHeight + ' | ' + y);
        this.$.image.applyStyle("-webkit-transform", "translate3d(0, " + y + "px, 0)");
    }
});

