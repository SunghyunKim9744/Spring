// NoticeList 컴포넌트

class NoticeList extends React.Component {

	constructor() {
		super();
		
		this.state = {
         list:[
            {"id":92032472,"title":"eff","writerId":"newlec","content":"af"}
         ],
         count:0,
      	};

		this.page=1;
		console.log("const");
	}
	
	componentDidMount(){
		this.invalidate();
		console.log("didMount");
	}
	
	pageClickHandler(e){
		e.preventDefault();
		//this.setState({page:e.target.innerText});
		this.page= e.target.innerText;
		this.invalidate();
		console.log(`${e.target.innerText}page click`);
	
	}
	
	invalidate(){
		//this.setState({page:value});
		fetch(`/api/notice/list?p=${this.page}`)
		.then((response)=>{
			return response.json();
		})
		.then((list)=>{
			this.setState({list});
			console.log(list);
		});
	}
		

	render() {
		console.log("render");
		return <main className="main">
			<h2 className="main title">공지사항</h2>

			<div className="breadcrumb">
				<h3 className="hidden">경로</h3>
				<ul>
					<li>home</li>
					<li>고객센터</li>
					<li>공지사항</li>
				</ul>
			</div>

			<div className="search-form margin-top first align-right">
				<h3 className="hidden">공지사항 검색폼</h3>
				<form className="table-form">
					<fieldset>
						<legend className="hidden">공지사항 검색 필드</legend>
						<label className="hidden">검색분류</label>
						<select name="f">
							<option value="title">제목</option>
							<option value="writer_Id">작성자</option>
						</select>
						<label className="hidden">검색어</label>
						<input type="text" name="q"/>
						<input className="btn btn-search" type="submit" value="검색" />
					</fieldset>
				</form>
			</div>

			<div className="notice margin-top">
				<h3 className="hidden">공지사항 목록</h3>
				<table className="table">
					<thead>
						<tr>
							<th className="w60">번호</th>
							<th className="expand">제목</th>
							<th className="w100">작성자</th>
							<th className="w100">작성일</th>
							<th className="w60">조회수</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.list.map(notice=>
														<tr key={notice.id}>
															<td>{notice.id}</td>
															<td className="title indent text-align-left"><a href={notice.id}>{notice.title}</a>({notice.cmtCount})</td>
															<td>{notice.writerId}</td>
															<td>{notice.regdate}</td>
															<td>{notice.hit}</td>
														</tr>)
						}
					</tbody>
				</table>
			</div>


			<div className="indexer margin-top align-right">
				<h3 className="hidden">현재 페이지</h3>
				<div><span className="text-orange text-strong">{this.page}</span> / pages</div>
			</div>

			<div className="margin-top align-center pager">

				<div>


					<a href="?p=&f=&q="><span className="btn btn-prev">이전</span></a>


					<span className="btn btn-prev" onClick={()=>{alert('이전 페이지가 없습니다.');}}>이전</span>


				</div>

				<ul className="-list- center" onClick={this.pageClickHandler.bind(this)}>
				{
					[1,2,3,4,5].map((i)=>
						<li key={i}><span className="-text- "><a href="?p=&f=&q=">{i}</a></span></li>
					)
				}
				</ul>

				<div>


					<a href="?p=&f=&q="><span className="btn btn-next">다음</span></a>

					<span className="btn btn-next" onClick={()=>{alert('다음 페이지가 없습니다.');}}>다음</span>

				</div>

			</div>

		</main>
	}
}

ReactDOM.render(
	<NoticeList />
	, document.querySelector("#main"));
