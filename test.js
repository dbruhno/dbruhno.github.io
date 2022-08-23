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

function getToken(code){
    var xhr = new XMLHttpRequest();
    var body = "grant_type=authorization_code&code=" + code + "&redirect_uri=https%3A%2F%2Fdbruhno.github.io";
    var link = 'https://www.reddit.com/api/v1/access_token';
    xhr.open("POST", link, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('Authorization','Basic TnpucmNTLVg3a1R2cFRDaHRPVmlsdzpCRFBjd1BGWng3OWkyY1ZhUmRmeDNLMXdYMVRhaXc=');
    xhr.send(body);
    xhr.onload = () => {
        var obj = JSON.parse(xhr.response);
        if(!obj.error) {
            addText("Access toke: " + obj.access_token);
            addText("Type: " + obj.token_type);
            addText("Expire in: " + obj.expires_in);
            addText("Refresh token: " + obj.refresh_token);
            addText("Scope: " + obj.scope);
        }
        else {
            addText("Error: " + obj.error);
        }
    };
}

function dumpQuery(query) {
    for (const [key, value]  of Object.entries(query)) {
        addText(key + " : " + value)
    }
}

var query = window.location.search.substring(1);
var parsed = parse_query_string(query)
if(!parsed.code){
//    addLink("https://www.reddit.com/api/v1/authorize?client_id=NznrcS-X7kTvpTChtOVilw&response_type=code&state=hello&redirect_uri=https%3A%2F%2Fdbruhno.github.io&duration=permanent&scope=identity,read,mysubreddits,wikiread", "Check out.");
    addLink("https://appleid.apple.com/auth/authorize?response_type=code&client_id=com.informelab.toonme&dbruhno.github.io", "Apple Sign in")
}
else{
//    getToken(parsed.code);
    dumpQuery(parsed)
}
