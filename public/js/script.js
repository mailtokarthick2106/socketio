
function onNewMessageReceived(chat) {
	let msg=`${chat.username} : ${chat.message}`;
	const chatContainer=document.getElementById("chatContainer");
	const colElement=document.createElement('div')
	colElement.className="col-12 align-self-end";
	const sentMsgElement=document.createElement('div');
	sentMsgElement.className="card received-message "
	const cardBodyElement=document.createElement('div');
	cardBodyElement.className="card-body";
	const cardTextElement=document.createElement('p');
	cardTextElement.innerHTML=msg;
	cardTextElement.className="card-text";
	cardBodyElement.appendChild(cardTextElement);
	sentMsgElement.appendChild(cardBodyElement);
	colElement.appendChild(sentMsgElement);
	chatContainer.insertBefore(colElement,chatContainer.childNodes[0])
}

function sendMessage(event,socket) {
	event.preventDefault();
	let chn=document.getElementById('channel').value;
	let msg=document.getElementById('message').value;
	let user=document.getElementById('username').value;
	let chat_box={username: user, message: msg,channel:chn}
	let chat=JSON.parse(JSON.stringify(chat_box));
	msg=`Me : ${chat.message}`;
	const chatContainer=document.getElementById("chatContainer");
	const colElement=document.createElement('div')
	colElement.className="col-12 align-self-end";
	const sentMsgElement=document.createElement('div');
	sentMsgElement.className="card sent-message "
	const cardBodyElement=document.createElement('div');
	cardBodyElement.className="card-body";
	const cardTextElement=document.createElement('p');

	cardTextElement.className="card-text";
	cardTextElement.innerHTML=msg;
	cardBodyElement.appendChild(cardTextElement);
	sentMsgElement.appendChild(cardBodyElement);
	colElement.appendChild(sentMsgElement);
	chatContainer.insertBefore(colElement,chatContainer.childNodes[0])

	socket.emit('message',chat)
	//socket.on('newMessage',chat);
	socket.on('newMessage',function(chat_value){
		console.log(chat_value);

	 });
}

function joinChannel(event,socket) {
	event.preventDefault();
	let newchannel=document.getElementById('newchannel').value;
	let dataArray={
		channel:newchannel
	}
	const data_value=JSON.parse(JSON.stringify(dataArray));
	socket.emit('joinChannel',data_value);
	socket.on('joinChannel',function(data){
		console.log("newchannel",data);
	});
}

function leaveChannel(event,socket) {
	event.preventDefault();
	let leave_channel=document.getElementById('newchannel').value;
	let dataArray={
		channel:leave_channel
	}
	let data_value=JSON.parse(JSON.stringify(dataArray));
	socket.emit('leaveChannel',data_value);
	socket.on('leaveChannel',function(data){
		console.log("leaveChannel",data);
	});
}

function onWelcomeMessageReceived(message) {

	console.log('inside welcome',message);

	const chatContainer=document.getElementById('chatContainer');
	let messageElement=`<div class="col-12">
	<div class="card received-message">
		<div class="card-body">
			<p class="card-text">System : ${message}</p>
		</div>
	</div></div>`
chatContainer.innerHTML=messageElement;
}

function onAddedToNewChannelReceived(channel) {
	console.log("LLLLLL");

	let channelName=channel['channel'];
	console.log(channelName,"KKKKKKKKK",channel['channel']);

	let channelsList=document.getElementById('channelsList');
	const alertContainer=document.getElementById("alertContainer")
	let alert=`<div class="alert alert-success alert-dismissible fade show" role="alert">
	You are added to <strong>${channelName}</strong> successfully!
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="false">&times;</span>
	</button>
	</div>`;
	let channels=`<option>${channelName}</option> `;
	alertContainer.innerHTML=alert;
	channelsList.innerHTML=channels;

	//let user_name=document.getElementById('username').value;
	//let message=`Welcome ${user_name} !!`;
	//onWelcomeMessageReceived(message);
}

function onRemovedFromChannelReceived(data) {
	console.log('onRemovedFromChannelReceived');
	let channelsList=document.getElementById('channelsList');
	const alertContainer=document.getElementById("alertContainer")
	let alert=`<div class="alert alert-success alert-dismissible fade show" role="alert">
	You are removed from <strong>${data.channel}</strong> successfully!
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="false">&times;</span>
	</button>
	</div>`;
	alertContainer.innerHTML=alert;

}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
