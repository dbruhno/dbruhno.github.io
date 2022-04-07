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

function addText(txt, tag){
    var tag = document.createElement("p");
    var text = document.createTextNode(txt);
    tag.appendChild(text);
    var element = document.getElementById(tag);
    element.appendChild(tag);
}

var query = window.location.search.substring(1);
var parsed = parse_query_string(query)
if(!parsed.code){
    addText("No code");
}
else{
    addText(parsed.code);
}
