var socket = io("http://localhost:822");


$(document).ready(function(){
	$("#loginForm").show();
	$("#chatForm").hide();
	$("#btnRegister").click(function(){
		if ($("#txtUsername").val()==""){
			alert("Please Enter your name");
		}else
		socket.emit("client-send-Username",$("#txtUsername").val());
	});

	$("#btnLogout").click(function(){
		socket.emit("logout"); 
		$("#chatForm").hide(2000);
		$("#loginForm").show(1000);
	});

	$("#btnSend").click(function(){
		if ($("#txtMessage").val()==""){
			alert("Empty message");
		}else{
			socket.emit("user-send-message",$("#txtMessage").val());
			$("#txtMessage").val("");
		}
	});

	window.addEventListener('beforeunload', function (e) { 
        socket.emit("logout");    
    }); 

    var textArea = document.getElementById('listMessages');
	textArea.scrollTop = textArea.scrollHeight;
});

socket.on("server-send-Fail",function(){
	alert("Sai username (ten da  duoc dang ki!!)")
});
socket.on("server-send-Success",function(data){
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
	$("#currentUser").html(data);
});

socket.on("server-send-all-User",function(data){
	$("#boxContent").html("");
	data.forEach(function(i){
		$("#boxContent").append("<div class='userOnline'>"+i+"</div>");
	});
});

socket.on("server-send-message",function(data){
	$("#listMessages").append("<div class='message'><b>"+data.user+"</b>:"+data.content+"</div>")
});


