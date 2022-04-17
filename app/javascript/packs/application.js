// Support component names relative to this directory:
var componentRequireContext = require.context("application/components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
window.React = global.React = require("react");
window.ReactDOM = global.ReactDOM = require("react-dom");
window.$ = $;
