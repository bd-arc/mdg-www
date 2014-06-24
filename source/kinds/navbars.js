enyo.kind({
    name: "HeaderNavbar",
    kind: "onyx.Toolbar",
    published: {
        header: "Application",
        showBack: null,
        loading: false
    },
    events: {
        onNavBack: ""
    },
    components: [
        {
            name: "back",
            classes: "toolbar-btn btn-back animated",
            ontap: "doNavBack"
        },
        {
            name: "header",
            classes: "animated",
            tag: "p"
        }
    ],
    create: function() {
        this.inherited(arguments);
        this.headerChanged();
    },
    rendered: function() {
        this.$.back.addClass("show");
        this.$.header.addClass("show");
    },
    headerChanged: function(previous, current, property) {
        this.$.header.set("content", this.get("header"));
    },
    showBackChanged: function(previous, current, property) {
        this.$.back.set("showing", current);
    },
    loadingChanged: function(previous, current, property) {
        if (current) {
            this.createComponent({
                kind: "jmtk.Spinner",
                name: "spinner",
                classes: "loading-spinner",
                shape: "spiral",
                color: "#ffffff",
                diameter: "30"
            });
            this.$.spinner.render();
            // Without a pseudo-timeout, there is no CSS animation...
            setTimeout(enyo.bind(this, function() {
                this.$.spinner.addClass("show");
            }), 0);
        } else if (this.$.spinner) {
            this.$.spinner.destroy();
        }
    }

});



enyo.kind({
    name: "ContentHeaderNavbar",
    kind: "onyx.Toolbar",
    classes: "content-navbar",
    published: {
        header: "Contenu",
        showBack: null,
        showFullscreen: null
    },
    events: {
        onContentNavBack: "",
        onFullscreen: ""
    },
    components: [
        {
            name: "back",
            classes: "toolbar-btn btn-back animated",
            ontap: "doContentNavBack"
        },
        {
            name: "header",
            classes: "animated",
            tag: "p"
        },
        {
            name: "fullscreen",
            classes: "toolbar-btn btn-fullscreen",
            ontap: "doFullscreen"
        }
    ],
    create: function() {
        this.inherited(arguments);
        this.headerChanged();
    },
    rendered: function() {
        this.$.back.addClass("show");
        this.$.header.addClass("show");
    },
    headerChanged: function() {
        this.$.header.set("content", this.get("header"));
    },
    showBackChanged: function(previous, current, property) {
        this.$.back.set("showing", current);
    },
    showFullscreenChanged: function(previous, current, property) {
        this.$.fullscreen.set("showing", current);
    }
});

