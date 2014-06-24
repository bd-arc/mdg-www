/**
    Define and instantiate your enyo.Application kind in this file.  Note,
    application rendering should be deferred until DOM is ready by wrapping
    it in a call to enyo.ready().
*/

enyo.kind({
    name: "mdg.Application",
    kind: "enyo.Application",
    view: "Application"
});


enyo.ready(function() {
    var OSClass, OSVersionClass;

    if ( enyo.platform.android ) {
        OSClass = 'isAndroid';
    } else if ( enyo.platform.ios ) {
        OSClass = 'isiOS';
    } else {
        OSClass = 'isDesktop';
    }

    OSVersionClass = 'os-version-' + enyo.platform[enyo.platform.platformName].toString().replace('.', '_');

    // This class will be used in CSS
    // jQuery( 'body' ).addClass( bodyClass );
    // document.body.className += ' ' + bodyClass;
    document.body.classList.add(OSClass);
    document.body.classList.add(OSVersionClass);

    // Render the app
    new mdg.Application({
        name: "app"
    });
});

