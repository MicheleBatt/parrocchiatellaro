import $ from "jquery";
import "popper.js";
import "bootstrap";
require("@rails/activestorage").start();
require("jquery");
//= require jquery
//= require jquery_ujs
//= require bootstrap.min

// Support component names relative to this directory:
var componentRequireContext = require.context("backoffice/components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
window.React = global.React = require("react");
window.ReactDOM = global.ReactDOM = require("react-dom");
window.$ = $;
