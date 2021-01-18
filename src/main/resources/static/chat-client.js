window.addEventListener("load", (e) => {

	const section = document.querySelector("#client");
	const chatList = section.querySelector(".chat-list");
	const chatInput = section.querySelector(".chat-input");
	const sendButton = section.querySelector(".send-button");

	const conButton = section.querySelector(".connection-button")

	let username = "newlec";
	/*let message = {
		username,
		chatData:""
	};*/
	// Create WebSocket connection.
	let socket;
	console.log(socket);

	conButton.addEventListener("click", (e) => {

		if(socket == undefined)
			socket = new WebSocket('ws://localhost:8080/chat');
		// Connection opened
		socket.addEventListener('open', function(event) {
			console.log("연결되었습니다");
		});
		// Listen for messages
		socket.addEventListener('message', function(e) {
			//console.log('Message from server ', event.data);
			let message = JSON.parse(e.data);
			let {username,chatData} = message;
			let chatItemTemplate = `<div>
							      		<span>profile</span>
							      		<span>${username}</span>
							      		<span>${chatData}</span>
									</div>`;
			chatList.insertAdjacentHTML("beforeend",chatItemTemplate);
		});
			
	})
	
	sendButton.onclick = ("click", (e) => {
		let message = {
				username,
				chatData:chatInput.value
		}
		console.log(message);
		console.log(JSON.stringify(message));
		// 서버에 보낼 때 문자열로 바꿔서 보내는 작업 = > JSON.stringify();
		if(socket != undefined)
			//socket.send(chatInput.value);
			socket.send(JSON.stringify(message));
	});
});

