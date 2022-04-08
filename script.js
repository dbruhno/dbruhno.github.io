function addText(txt){
    var h1 = document.createElement("H1");
    h1.textContent = txt;
    var el = document.getElementById("myDiv");
    el.appendChild(h1);
}

function addLink(link, txt){
    var a = document.createElement('a');
    var linkText = document.createTextNode(txt);
    a.title = txt;
    a.appendChild(linkText);
    a.href = link;
    var h1 = document.createElement("H1");
    h1.appendChild(a);
    var el = document.getElementById("myDiv");
    el.appendChild(h1);

}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair.shift());
    var value = decodeURIComponent(pair.join("="));
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = value;
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], value];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(value);
    }
  }
  return query_string;
}

var d = new Date();
addText("Check cookies.");
var v = "code=CODE1; expires=" + d.toGMTString() + "; path=/;";
addText("Src: " + v);
document.cookie = v;
let allCookies = document.cookie;
addText("Rst: " + allCookies);
var total = "Saved: " + allCookies.length + " symbols.";
addText(total);
addText("Test complete.");
