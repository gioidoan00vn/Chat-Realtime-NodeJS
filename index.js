var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(822);

var arrUsers=[];

io.on("connection",function(socket){
	console.log("co nguoi ket noi "+socket.id);
	socket.on("client-send-Username",function(data){
		if(arrUsers.indexOf(data)>=0){
			socket.emit("server-send-Fail");
		}else{
			arrUsers.push(data);
			socket.Username = data;
			socket.emit("server-send-Success", data);
			console.log(arrUsers);
			io.sockets.emit("server-send-all-User",arrUsers);
		}
	});

	socket.on("logout",function(){
		arrUsers.splice(
			arrUsers.indexOf(socket.Username),1
		);
		socket.broadcast.emit("server-send-all-User",arrUsers);
	});

	socket.on("user-send-message",function(data){
		io.sockets.emit("server-send-message",{user:socket.Username,content:data});
	});

});



app.get("/", function(req,res){
	res.render("index");
});