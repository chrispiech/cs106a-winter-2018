var msgIndex = 0
var username = ""
var HOST = "http://localhost:8080/"

function getMessageHtml(msg) {
	var html = ''
	html += '<li class="list-group-item">'
	html += "> " + msg
	html += '</li>'
	return html
}

function loadMessages() {
	$.get( HOST + "getMsgs", { index: "" + msgIndex} , function(msgString){
    	console.log(msgString)
    	msgString = msgString.substring(1, msgString.length-1)
    	if(msgString == "") return
    	var messages = msgString.split(",");
    	console.log(messages)
    	for (var i = 0; i < messages.length; i++) {
    		var msg = messages[i]
    		var msgHtml = getMessageHtml(msg);
    		$("#messages").append(msgHtml);
    	};
    	msgIndex += messages.length
    });
}

function refreshButtonClicked() {
	loadMessages();
}

function sendButtonClicked() {
	var toSend = username + ": " + $("#msgInput").val();
	console.log(toSend)
	$.get( HOST + "newMsg", { msg: toSend} , function(result){
    	console.log(result);
    	loadMessages()
    });
}

function logInButton() {
	username = $("#usernameInput").val()
	$("#loginModal").modal('hide')
	console.log(username)
	console.log('loggedin')
}

function getUsername() {
	 $("#loginModal").modal()
}

$( document ).ready(function() {
   console.log( "ready!" );
   getUsername();
   loadMessages();
});