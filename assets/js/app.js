// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"
//
//
import xholes_init from "./xholes";
import "./xholes"
window.addEventListener("load", (_ev) => {
  let root = document.getElementById('root');
  if (root) {
	let channel = socket.channel("game:" + window.gameName , window.playerName);
	  console.log("game:" + window.gameName + window.gamePlayer);
	  console.log(window.gameName);
	  console.log(window.playerName);
    xholes_init(root,channel);
  }
});
