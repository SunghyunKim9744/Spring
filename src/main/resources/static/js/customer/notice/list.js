// NoticeList 컴포넌트

class NoticeList extends React.Component {

	constructor() {
		super();
		
		//1. DOM 
		// this.queryInput = null;
		
		//2. React
		this.queryInput = React.createRef();
		this.fieldInput = React.createRef();
		
		this.state = {
         list:[
            {"id":92032472,"title":"eff","writerId":"newlec","content":"af"}
         ],
         count:0,
      	};

		this.page=20;
		this.field = "title";
		this.query="";
		this.startNum=this.page-(this.page-1)%5;

		console.log("const");
	}
	
	componentDidMount(){
		this.invalidate();
		
		//1. DOM
		//this.queryInput = document.querySelector(".query");
		console.log("didMount");
	}
	
	pageClickHandler(e){
		e.preventDefault();
		//this.setState({page:e.target.innerText});
		this.page= e.target.innerText;
		this.invalidate();
		console.log(`${e.target.innerText}page click`);
	
	}
	
	serarchButtonClickHandler(e){
		e.preventDefault();
		// 1. DOM
		//this.query = this.queryInput.value;
		
		// 2.React
		this.query = this.queryInput.current.value;
		this.field = this.fieldInput.current.value;
		console.log(this.field);
		this.invalidate();
	}
	
	prevPageClickHandler(e){
		e.preventDefault();
		this.page = this.startNum-5+4;
		this.invalidate();
	}
	
	invalidate(){
		//this.setState({page:value});
		fetch(`/api/notice/list?p=${this.page}&f=${this.field}&q=${this.query}`)
		.then((response)=>{
			//console.log(response);
			return response.json();
		})
		.then((data)=>{
			console.log(data);
			this.startNum = this.page-(this.page-1)%5;
		
			
			
			
			this.setState(data);
			
			
		});
		 //.then(({list, count}) => {
         //   this.setState({list, count});
         //}); //밑과 같음
         //.then((data) => {
         //   this.setState({
         //      list: data.list,
         //      count: data.count
         //   });
         //})

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
						<select name="f" ref={this.fieldInput}>
							<option value="title">제목</option>
							<option value="writerId">작성자</option>
						</select>
						<label className="hidden">검색어</label>
						<input type="text" /*1. DOM => className="query"*/ /*2. React*/ ref={this.queryInput} name="q"/>
						<input className="btn btn-search" type="submit" value="검색" onClick={this.serarchButtonClickHandler.bind(this)}/>
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
				<div><span className="text-orange text-strong">{this.page}</span> / {this.state.count}pages</div>
			</div>

			<div className="margin-top align-center pager">

				<div>

				{
					this.startNum<=1
					?<span className="btn btn-prev" onClick={()=>{alert('이전 페이지가 없습니다.');}}>이전</span>
					:<a href=""><span className="btn btn-prev" onClick={this.prevPageClickHandler.bind(this)}>이전</span></a>
				}
					
				</div>

				<ul className="-list- center" onClick={this.pageClickHandler.bind(this)}>
				{
					[0,1,2,3,4].map((i)=>
						<li key={this.startNum+i}><span className="-text- "><a href="">{this.startNum+i}</a></span></li>
					)
				}
				</ul>

				<div>


					<a href=""><span className="btn btn-next">다음</span></a>

					<span className="btn btn-next" onClick={()=>{alert('다음 페이지가 없습니다.');}}>다음</span>

				</div>

			</div>

		</main>
	}
}

ReactDOM.render(
	<NoticeList />
	, document.querySelector("#main"));

// 리엑트란? -> Flux를 구현한 프레임워크다.
      // Flux는 뭐냐> MVC가 SNS관련 서비스를 구현하기에는 부적합하다 생각되어서 
      // - Store(Buffering이 가능한 Model) 개념의 단방향 렌더링(rendering)을 지원하는 방법론이다.
      // 따라서 우리는 최대한 단방향 MVC 방식으로 코딩을 해결하면서 React가 가지는 장점도 최대한 활용할 수 있어야 한다.
      
      // rendering을 위한 프레임워크이므로 -> 빠르게 렌더링하기 위해 JSX(Virtual DOM)을 사용
      // rendering을 유발하는 주체 -> state
      // 컴포넌트 -> 기존 페이지에서 rendering 단위 블럭을 잘라낸 블록
      //    : Component 종류 function / class
      //    : class 콤포넌트를 사용하는 경우? state를 활용할 때
      //      단 최근에는 Hook를 이용해서 function 콤포넌트에서도 제한적으로 state를 활용할 수 있다.
      // Commponent 중첩 -> 내부 컴포넌트에게 값을 전달하게 될 때  Props를 통해서 공유할 수 있다.
      
      // 2WAY 방식을 처리하기 위해 input 박스에 state를 바인딩하고 onChange를 통해서 state를 변경하는데
      //   가능하면  value/onChange를 모두 지우고 대안을 생각해보는 것이 필요.
      // * fetch api 
      // 코드 블록 { } : JSP의 <% %>,"<%=page==1?'hello':'ok' %>->out.print("")",<%! %>,<%@ %>