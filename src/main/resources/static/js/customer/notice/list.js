
// React 방식(1way) 단방향
// - > dispatcher - > store[state] - > view
//  ↑									│
//  └───────────────────────────────────┘

// MVC 방식 (2way) mv 양방향
// - > controller - > model <-> view


// function으로 만들기.
// Component(Clock)에서의 인자 전달 방법 = > Tag는 속성을 주듯이,
// 함수에선 props를 이용(예약어는 아니지만 예약어처럼 사용해야함)

//function Clock(props){
	/* Model */
//	let time = new Date().toLocaleString(props.locale, { timeZone: props.timeZone }); 
	
	// ---------------------------------------------------
	/* js가 아님! = > 문자열이 아닌 객체가 반환됨.*/
//	return <section>
//				<h1>{props.timeZone}</h1>
//				<div>It is {time}</div>
//			</section>
//}

// ES6 = > Class로 만들기.

/*class Clock extends React.Component{

	render(){
		// Model 
		let time = new Date().toLocaleString(this.props.locale, { timeZone: this.props.timeZone });
		
		return <section>
				<h1>{this.props.timeZone}</h1>
				<div>It is {time}</div>
			   </section>
	}
}*/


// React 방식(1way) 단방향
// - > dispatcher - > store[state] - > view
//  ↑									│
//  └───────────────────────────────────┘
class Clock extends React.Component{
	
	constructor(props){
		super(props);
		/* Model */
		let time = new Date().toLocaleString(this.props.locale, { timeZone:this.props.timeZone });
		let timeZone = props.timeZone;
		// state 는 예약어임, 이름 변경 불가 + 개별적으로 담을 수가없음, 한번에 담아야함.
		this.state = {time,timeZone};
	}
	
	tick(){
		let time = new Date().toLocaleString(this.props.locale, { timeZone:this.props.timeZone });
		let timeZone = this.props.timeZone;
		// state 는 예약어임, 이름 변경 불가 + 개별적으로 담을 수가없음, 한번에 담아야함.
		this.setState({time,timeZone});
	}
	// 화면에 올라 갔을 때
	componentDidMount(){
		// Arrow Function = > 외부 영역의 this 사용 가능.
		setInterval(()=>{
			this.tick()
		},1000);
		console.log(this.state.timeZone+" didMount");
	}
	
	componentWillUnmount(){
		console.log(this.state.timeZone+" unMount");
	}

	render(){
		
		return <section>
				<h1>{this.state.timeZone}</h1>
				<div>It is {this.state.time}</div>
			   </section>
	}
}



function tic() { 
	// Component(Clock)에서의 인자 전달 방법 = > Tag는 속성을 주듯이,
// 함수에선 props를 이용(예약어는 아니지만 예약어처럼 사용해야함)
	ReactDOM.render(
		<section>
		<h1>세계시간</h1>
			<hr />
			<Clock timeZone="Asia/Seoul" locale="ko-KR" />
			<hr />
			<Clock timeZone="America/Toronto" locale="en-US" />
			<hr />
		</section>
		, document.querySelector("#root"));
}




//setInterval(tic, 1000);
tic();