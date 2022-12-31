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

function getToken(code){
  addText('Obtain token.');
    var xhr = new XMLHttpRequest();
    var body = "grant_type=authorization_code&code=" + code + "&redirect_uri=https%3A%2F%2Fdbruhno.github.io%2Freddit.html";
    var link = 'https://www.reddit.com/api/v1/access_token';
    xhr.open("POST", link, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('Authorization','Basic TnpucmNTLVg3a1R2cFRDaHRPVmlsdzpCRFBjd1BGWng3OWkyY1ZhUmRmeDNLMXdYMVRhaXc=');
    xhr.send(body);
    xhr.onload = () => {
        var obj = JSON.parse(xhr.response);
        if(!obj.error) {
            addText("Access token: " + obj.access_token);
            addText("Type: " + obj.token_type);
            addText("Expire in: " + obj.expires_in);
            addText("Refresh token: " + obj.refresh_token);
            addText("Scope: " + obj.scope);
            
            setCookie('AcceessToken', obj.access_token, 100);
            setCookie('ExpireIn', obj.expires_in, 100);
            setCookie('RefreshToken', obj.refresh_token, 100);
            setCookie('Scope', obj.scope, 100);
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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var params = new URL(window.location.toLocaleString()).searchParams;
var code = params.get('code');
if (code != null){
  addText('Code: ' + code);
  getToken(code);
}
else {
  addText('Code: ' + code);
}

var token = getCookie('AcceessToken');
let expire = getCookie('ExpireIn');

if (token != '') {
  addText('Token: ' + token);
}
else {
  addText('No token.');
}
if (expire != '') {
  addText('Expire in: ' + expire);
}
addLink("https://www.reddit.com/api/v1/authorize?client_id=NznrcS-X7kTvpTChtOVilw&response_type=code&state=hello&redirect_uri=https%3A%2F%2Fdbruhno.github.io%2Freddit.html&duration=permanent&scope=identity,read,mysubreddits,wikiread", "Refresh token.");
