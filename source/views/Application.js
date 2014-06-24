// From https://github.com/enyojs/sampler

enyo.kind({
    name: "Application",
    classes: "app enyo-unselectable",
    samples: [],
    handlers: {
        onresize: "resized",
        onFullscreen: "toggleFullScreen",
        onNavBack: "navBack",
        onContentNavBack: "contentNavBack",
        onPushContent: "pushContentView",
        onOpenDialog: "openDialog"
    },
    components: [
        {
            kind: "Signals",
            ondeviceready: "deviceReady",
            ononline: "online",
            onoffline: "offline",
            onresume: "resume",
            onpause: "pause",
            backbutton: "backbutton"
        },
        {
            kind: "InputSheet",
            name: "firstScreen",
            value: 0,
            destroyOnDisappearance: true
        },
        {
            kind: "Panels",
            name: "mainPanels",
            classes: "panels enyo-fit",
            arrangerKind: "CollapsingArranger",
            draggable: false,
            components: [
                {
                    kind: "MainViews",
                    name: "navPanels",
                    classes: "mainview"
                },
                {
                    kind: "ContentViews",
                    name: "contentPanels",
                    classes: "contentview"
                }
            ]
        }
    ],
    create: function() {
        this.inherited(arguments);

        // See gallery example to have an idea about how to handle hash
        // window.onhashchange = this.bindSafely("hashChange");

        this.toggleNarrowClass();

        this.$.navPanels.pushView({
            kind: "SimpleView",
            firstView: true
        });
        this.$.contentPanels.pushView({
            kind: "RecipeView"
        });

        // WARNING: this one is just there to populate the first view
        this.$.navPanels.triggerHandler("onTransitionFinish");
    },
    rendered: function() {
        this.inherited(arguments);
    },
    resized: function(inSender, inEvent) {
        this.log();
        this.$.mainPanels.narrowFitChanged();
        this.toggleNarrowClass();
        this.toggleMainPanels();
    },
    navChanged: function() {

    },
    navBack: function(inSender, inEvent) {
        this.$.navPanels.popView();
    },
    contentNavBack: function(inSender, inEvent) {
        if (this.$.mainPanels.index !== 0) {
            this.$.mainPanels.setIndex(0);
        }
    },
    pushContentView: function() {
        this.toggleMainPanels(true);
        this.$.contentPanels.pushView({
            kind: "RecipeView"
        });
    },
    toggleMainPanels: function(transition) {
        var index = enyo.Panels.isScreenNarrow() ? 1 : 0;

        if (transition) {
            this.$.mainPanels.setIndex(index);
        } else {
            this.$.mainPanels.setIndexDirect(index);
        }
    },
    toggleFullScreen: function() {
        this.$.mainPanels.setIndex(this.$.mainPanels.index ? 0 : 1);
    },
    toggleNarrowClass: function() {
        var narrowClass = "narrow";
        // Exact same condition as Panels.narrowFitChanged() to avoid issues
        if (this.$.mainPanels.narrowFit && enyo.Panels.isScreenNarrow()) {
            document.body.classList.add(narrowClass);
        } else {
            document.body.classList.remove(narrowClass);
        }
    },
    openDialog: function(inSender, inEvent) {
        if (!this.$.dialog) {
            this.createComponent({
                kind: "Dialog",
                name: "dialog"
            });
            this.$.dialog.render();
        } else {
            this.$.dialog.addRemoveClass('show', true);
        }

        return true;
    },
    openExternal: function() {
        window.open(this.externalURL, "_blank");
    },
    hashChange: function() {
        // var n = this.getHashComponentName();
    },
    getHashComponentName: function() {
        return window.location.hash.slice(1);
    },
    setHashComponentName: function(inName) {
        window.location.hash = inName;
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    alert: function() {
        alert('test');
    },
    // PhoneGap events
    deviceReady: function() {
        this.log();
    },
    online: function() {
        this.log();
    },
    offline: function() {
        this.log();
    },
    resume: function() {
        this.log();
    },
    pause: function() {
        this.log();
    },
    backbutton: function() {
        this.log();
        if (enyo.Panels.isScreenNarrow() && this.$.mainPanels.index !== 0) {
            this.contentNavBack();
        } else {
            this.navBack();
        }
    }
});



enyo.kind({
    name: "ViewStack",
    kind: "Panels",
    arrangerKind: "CarouselArranger",
    draggable: false,
    events: {
        // This event will waterfall down to warn components
        onUpdateContent: ""
    },
    handlers: {
        onTransitionFinish: "transitionFinished"
    },
    currView: -1,
    transitionFinished: function(inSender, inEvent) {
        this.log(inEvent.fromIndex + ' -> ' + inEvent.toIndex);
        // Destroy subsequent tiles
        this.destroyAfter();
        // Warn data-aware components of the current panel
        this.getActive().waterfall("onUpdateContent", inEvent);
    },
    destroyAfter: function() {
        this.log();
        // Suppress event while in the process of popping panels
        if (this.suppressFinish) {
            return true;
        }

        // When the last panel is greater than the current, we need to pop
        var last = this.getPanels().length - 1;
        if (last > this.currView) {
            this.suppressFinish = true;
            // Turn off animation, since panels will jump while destroying
            //this.saveAnimate = this.getAnimate();
            //this.setAnimate(false);
            // Pop any views in excess (to the right) of the current
            while (last > this.currView) {
                var view = this.getPanels()[last];
                view.destroy();
                last--;
            }
            // Go directly back to the current view and restore animation
            //this.setIndexDirect(this.currView); // This will trigger another 'onTransitionFinish'...
            //this.setAnimate(this.saveAnimate);
            this.suppressFinish = false;
        }
    },
    pushView: function(viewKind, viewOpts, viewName) {
        if (viewName && this.$[viewName]) {
            this.currView = this.selectPanelByName(viewName);
            return this.getActive();
        } else {
            this.currView++;
            var c = this.createComponent(viewKind, viewOpts);
            c.render();
            this.reflow();
            this.next();
            return c;
        }
    },
    popView: function() {
        if (this.currView > 0) {
            this.currView--;
            this.previous();
        }
    },
    popToRootView: function(direct) {
        this.currView = 0;
        if (direct) {
            this.setIndexDirect(0);
        } else {
            this.setIndex(0);
        }
    },
    popAll: function() {
        this.currView = -1;
        this.saveAnimate = this.getAnimate();
        this.setAnimate(false);
        this.suppressFinish = true;
        var last = this.getPanels().length - 1;
        while (last > -1) {
            var view = this.getPanels()[last];
            view.destroy();
            last--;
        }
        this.setAnimate(this.saveAnimate);
        this.suppressFinish = false;
    }
});



enyo.kind({
    name: "MainViews",
    kind: "ViewStack",
    classes: "enyo-fit",
    events: {
        onUpdateHistory: ""
    },
    handlers: {
        // At the moment, this event is triggered by the SimpleView kind
        onPushView: "showView"
    },
    showView: function(inSender, inEvent) {
        var viewName = inEvent.name;
        // this.doUpdateHistory("chu/" + obj.id + "/", event);
        if (this.lazyViews[viewName]) {
            this.pushView(this.lazyViews[viewName], null, viewName);
        }
        return true; // Stop event propagation
    },
    lazyViews: {
        chuisyExample: {
            kind: "ComposeChu",
            name: "compose",
            onDone: "composeChuDone"
        },
        blocks: {
            kind: "BlocksMasonry",
            name: "blocks",
            onDone: "chuViewDone"
        },
        inputSheet: {
            kind: "InputSheet",
            name: "inputSheet"
        },
        dialog: {
            kind: "Dialog",
            name: "dialog"
        },
        view: {
            kind: "SimpleView"
        }
    }
});



enyo.kind({
    kind: "Panels",
    name: "ContentViews",
    arrangerKind: "CardArranger",
    draggable: false,
    classes: "enyo-fit",
    pushView: function(viewKind, viewOpts) {
        // We always keep only one view
        this.destroyComponents();
        var c = this.createComponent(viewKind, viewOpts);
        c.render();
        this.reflow();
        return c;
    },
    popView: function() {
        this.destroyComponents();
    }
});

