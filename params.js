if (addEventListener) addEventListener("load",params,false);
else attachEvent("onload", params);

function params()
{
  "use strict";
  var message = document.getElementById("message").firstChild;
  var url = window.location.href;
  var parts = url.split("?");
  if (parts.length < 2)
  {
    message.data = "No parameters found.";
    return;
  }
  var paramstring = parts[1];
  var params = paramstring.split("&");
  message.data = "Parameters found:";
  var list = document.getElementById("list");
  for (var i = 0; i < params.length; i++)
  {
    var def = params[i].split("=");
    var name = def[0];
    var value = def[1];
    var txt = document.createTextNode(name + " = " + value);
    var li = document.createElement("li");
    li.appendChild(txt);
    list.appendChild(li);
  }
}
