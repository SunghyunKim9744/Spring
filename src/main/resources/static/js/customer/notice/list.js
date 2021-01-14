window.addEventListener("load",(e)=>{
	const pager = document.querySelector(".pager");

	
	pager.addEventListener("click",(e)=>{
		e.preventDefault();
		console.log(e.target.innerText);
		
		
		// ==== 옛날 방식
		/*
		let request = new XMLHttpRequest();
		request.addEventListener("load",(e)=>{
			console.log(e.target.responseText);
		});
		request.open("GET","/api/notice/list");
		request.send();
		*/
		
		// ==== 현재 방식
		fetch("/api/notice/list")
		.then(response =>console.log(response));

	});
});