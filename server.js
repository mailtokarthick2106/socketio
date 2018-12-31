function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {

	console.log('info','Connected the Chat ');

	socket.on('message' ,(data)=>{
		console.log('info','Message Box ',data.channel);
	 io.to(data.channel).emit("newMessage",data);
	})
	socket.on('register' ,(data)=>{
		console.log(data.channel,"Before")
	 console.log('info','Registered Channel',data.channels[0]);
	 let msg=`Welcome ${data.username} !!`;
	 socket.emit('welcomeMessage',msg);
	 let i;
	 for(i=0;i<data.channels.length;i++){
		console.log(i,"kk",data.channels[i]);

		 socket.emit('addedToChannel',{channel:`${data.channels[i]}`});
		//enableTimeouts(false);
		socket.join(data.channels[i] ,()=>{
			console.log(i,"PPPP",data.channels[i]);

			//io.to(data.channels[i]).emit('addedToChannel',{channel:`${data.channels[i]}`});
			io.emit('addedToChannel',{channel:`${data.channels[i]}`});
			let rooms=Object.keys(socket.rooms);
		 console.log(rooms,"rooms");


	 })
	}

	})
	io.on('connection',function(socket){
	socket.on('joinChannel',(data)=>{
	console.log('info','Joined Channel',data.channel);
	 //socket.join(data.channel);
	 socket.join(data.channel ,()=>{
		let rooms=Object.keys(socket.rooms);
		console.log(rooms,"rooms");
		io.to(data.channel).emit('addedToChannel',{channel:`${data.channel}`});

	})
})

   socket.on('leaveChannel',(data)=>{
	console.log('info','Leave Channel',data.channel);
	socket.emit('removedFromChannel',{channel:`${data.channel}`});
	socket.leave(data.channel , ()=>{
		let rooms=Object.keys(socket.rooms);
		console.log(rooms,"rooms");
		io.to(data.channel).emit('removedFromChannel',{channel:`${data.channel}`});
	});

   })
})
})
}

module.exports = bootstrapSocketServer;
