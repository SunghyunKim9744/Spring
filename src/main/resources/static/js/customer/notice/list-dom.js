window.addEventListener("load",(e)=>{
	const pager = document.querySelector(".pager");

	const notice = document.querySelector(".notice");
	const tbody = notice.querySelector("tbody");
	const searchForm = document.querySelector(".search-form");
	const searchButton = searchForm.querySelector(".btn-search");
	const queryInput = searchForm.querySelector("input[name=q]");
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
		let page = e.target.innerText;
		let query = queryInput.value;
		let field="title";
		fetch(`/api/notice/list?p=${page}&f=${field}&q=${query}`)
		.then(response =>response.json())
		.then(
			json=>{
				tbody.innerHTML="";
				
				for(let n of json){
					let tr = `
						<td>${n.id}</td>
						<td class="title indent text-align-left"><a href="${n.id}">${n.title}</a>[${n.cmtCount}]</td>
						<td>${n.writerId}</td>
						<td>${n.regdate}"</td>
						<td>${n.hit }</td>
					`;
					tbody.insertAdjacentHTML("beforeend",tr);
				}
			
			}
		);
	});
	
	searchButton.addEventListener("click",(e)=>{
		e.preventDefault();

		let page = e.target.innerText;
		let query = queryInput.value;
		let field="title";
		fetch(`/api/notice/list?p=${page}&f=${field}&q=${query}`)
		.then(response =>response.json())
		.then(
			json=>{
				tbody.innerHTML="";
				
				for(let n of json){
					let tr = `
						<td>${n.id}</td>
						<td class="title indent text-align-left"><a href="${n.id}">${n.title}</a>[${n.cmtCount}]</td>
						<td>${n.writerId}</td>
						<td>${n.regdate}"</td>
						<td>${n.hit }</td>
					`;
					tbody.insertAdjacentHTML("beforeend",tr);
				}
			
			}
		);

	});
});