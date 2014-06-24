enyo.depends(
    // Layout library
    "$lib/layout",
    // Onyx UI library
    "$lib/onyx",	// To theme Onyx using Theme.less, change this line to $lib/onyx/source,
    //"Theme.less",	// uncomment this line, and follow the steps described in Theme.less
    // CSS/LESS style files
    "style",

    "$lib/jquery",
    // "$lib/jquery.visible",
    "$lib/canvasSpinner",
    "$lib/smooth-panels",

    // Model and data definitions
    "data",
    // View kind definitions
    "views",
    // Custom kinds
    "kinds",

    // TESTING
    // "__samplerApp.js",

    // Include our default entry point
    "app.js"
);