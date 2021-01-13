/*
1. 변수 선언
-1 let:변수명 중복 선언문제 해결,
       지역화 해결
    const : 범주형 값을 사용할 수 있다.
       add = function(){};
       add = 3;
       위와 같이 변수가 다른 값으로 대치되는.. 문제 해결
2 template String
   기존 노드 조작을 아주 편하게 구현할 수 있게 해준다.
   MVC를 구현 가능하게 해주는 구문..
   *어금부호(`)를 이용한 문자열의 템플릿화*

3. Enhanced Object Literal Syntax
-1 변수를 가지고 속성을 정의하던 방식이 개선
    function createExam(kor, eng, math){
        //return {kor:kor, eng:eng, math:math};
        // 위의 표현방법이 아래처럼... 어때? 좋지? 좋아~
        return {kor, eng, math};
    }
-2 객체가 함수를 포함하는 식이 편해졌다.
    let exam = {
        kor:30,
        eng:40,
        math:50,
        //total:function(){
        total(){
            return 60;
        }
    };
    //추가 설명
    //total 메소드에서 kor 멤버를 접근하려면?
    //kor는 outer 지역변수가 아니라 멤버 변수니까.. 
    //그런 경우에는 this 객체의 멤버로 지정해주어야 한다. 다음처럼
    let exam = {
        kor:30,
        eng:40,
        math:50,
        //total:function(){
        total(){
            return kor // (X)
            return this.kor; // (O)
        }
    };

*/

let title = "ES6에 대한 평가";
let content = "너무 좋대";

// 어금부호(`)로 여러 줄인걸 나타낼 수 있음.
// String.raw  - > 서식문자 문자로 출력하기 
const template = String.raw`<section>\n\n\n
                    <h1>${title}</h1>
                    <div>${content}</div>
                    </section>`;
console.log(template);

let exam = {};
// 1.
// exam.kor = 30;
// exam.math = 40;
// exam.eng = 50;
let kor = 30;
let math = 40;
let eng = 50;

// 2.
// exam = {
//     kor : kor,
//     math : math,
//     eng : eng
// }

// 키가 아닌 벨류만 적어도 가능
// 3.
exam = { kor, math, eng };
console.log(exam);

// ex1
function test() {
    return { kor, math, eng };
}

// ex2
exam = {
    kor,
    eng,
    math,
    total: function () {
        // this - > exam 안에 있는 kor과 eng - > 87,88번째 줄
        return this.kor + this.eng;
    }
}

//ex3 함수에서 function 키워드 생략
exam = {
    kor,
    eng,
    math,
    total() {
        // this - > exam 안에 있는 kor과 eng - > 98,99번째 줄
        return this.kor + this.eng;
    }
}

// 사전지식
// 함수를 사용하는 두 가지 방법
// 기능을 가지는 함수를 정의한 것
function print() {
    console.log("hello");
}

print();

// 개체를 정의하는 함수 ==> js에는 클래스는 없다.
// class Exam{
//     var kor;
//     var eng;
//     var math;
    // function Exam() {
    //     this.kor = 10;
    //     this.eng = 20;

    //     this.total = function () {
    //         var kor = 30;
    //         return this.kor;
    //     }
    // };
// };

// var exam3 = new Exam();
// console.log(exam3);
// console.log(`total is ${exam3.total()}`);


// ========== Destructuring #1-1 =============
{
    let exam = {
        kor: 30,
        eng: 40,
        math: 50
    };

    // let kor = exam.kor;
    // let eng = exam.eng;
    // console.log(`kor : ${kor}, eng : ${eng}`);

    //  143~145 Destructuring을 아래와 같이 편하게 해줌
    // exam안의 kor,eng를 지역변수로 만들어서 대입. 순서상관X
    let { eng, kor } = exam;
    console.log(`kor : ${kor}, eng : ${eng}`);

    // ========== Destructuring #1-2 =============
    // exam의 값이 변했을 때 대입 하는 방법 ()사용
    exam.kor = 100;
    exam.eng = 500;
    ({ eng, kor } = exam);
    console.log(`kor : ${kor}, eng : ${eng}`);

    exam.kor = 50;
    ({ kor } = exam);
    console.log(`kor : ${kor}, eng : ${eng}`);
}

// ========== Destructuring #2 =============
// 속성의 확장과 기본값

{
    let exam = {
        kor: 30,
        eng1: 40,
        math: 50
    };

    {
        // exam에 없는 속성도 사용이 가능.
        let { eng1, kor, total } = exam;
        console.log(`kor : ${kor}, eng : ${eng1}, total : ${total}`);

        // total에 값 대입
        ({ total=0 } = exam);
        console.log(`kor : ${kor}, eng : ${eng1}, total : ${total}`);
    }


    // 속성이름 별칭주기
    {
        let { eng1: english, kor, total = 0 } = exam;
        // eng1을 english로 사용해야함.
        // console.log(`kor : ${kor}, eng : ${eng1}, total : ${total}`);
        console.log(`kor : ${kor}, eng : ${english}, total : ${total}`);

    }
}

// ========== Destructuring #3 =============
// 중첩된 객체의 속성
{
    let exam = {
        kor: 30,
        eng: 40,
        math: 50,
        student: {
            name: "newlec",
            phone: "010-1234-5678"
        }
    };

    // exam안의 student
    let { student } = exam;
    console.log(student);

    {
        // exam안의 student안의 name값 꺼내기.
        let { student: { name } } = exam;
        console.log(name);
    }


    let { kor, student: { name, phone } } = exam;
    console.log(`kor : ${kor}, student name : ${name}, student phone : ${phone}`);
}

// ========== Destructuring #4 =============
// 매개변수
{
    function printExam({ kor, eng, math /*destructuring*/ }) {
        console.log(`kor : ${kor}, eng : ${eng}, math : ${math}`);
    }
    let { kor = 10, eng = 20, math = 30 } = {}; // destructuring
    printExam({ kor, eng, math }); // create Object
}

// ========== Destructuring #5 =============
// Array destructuring
{
    let kors = [10, 20, 30];
    let [k1, k2, k3] = kors;

    console.log(`k1 : ${k1}, k2 : ${k2}, k3 : ${k3},`);

    // 다른 값 대입
    [k1] = [100, 200, 300]; // 100 대입
    [, k2] = [100, 200, 300]; // 200 대입
    [, , k3] = [100, 200, 300]; // 300 대입
    console.log(`k1 : ${k1}, k2 : ${k2}, k3 : ${k3},`);

    //꼼수 swapping
    let x = 2;
    let y = 3;
    let z = 5;
    console.log(`x:${x},y:${y},z:${z}`);

    //교체(Swap) 순서 재배열
    //    let t = x;
    //    x = y;
    //    y = t;
    [z, x, y] = [y, x, z];
    console.log(`z:${z},y:${y},x:${x}`);

    //인자의 수가 일치하지 않은 경우
    //let [a,b,c,d=0] = kors;

    //중첩 배열 뽀개기
    {
        let kors = [10, 20, 30, [40, 50]];
        let [
            kor1,
            kor2,
            kor3,
            [
                kor4,
                kor5
            ]
        ] = kors;

        console.log(`${kor1},${kor2},${kor3},${kor4},${kor5}`);

    }

    // 객체와 배열 섞기
    let notice = {
        id: 1,
        title: "공지사항",
        files: [
            "img1.png",
            "img2.png"
        ]
    };

    let { id, title, files: [img1], files: [, img2] } = notice;
    console.log(`id : ${id}, title : ${title}, files[0] : ${img1}, files[1] : ${img2}`);
}

{   // ========== Set ============
    // let set = new Set();
    // set.add(5);
    // set.add("5");
    // set.add(2);
    // set.add(5);
    // 아래와 같이 가능.

    // set
    // .add(5)
    // .add("5")
    // .add(2)
    // .add(5);

    // 일반적으로 배열에 데이터를 담아 셋을 생성
    let lotto = [2, 3, 4, 3, 3, 2, 5, 6, 1];
    let set = new Set(lotto);
    console.log(set.size);

    // Set에 담겨진 값 확인 - > has
    // set.has(5); // - > true

    // 삭제
    // if(set.has(5))
    //     set.delete(5);
    // console.log(set.size);

    // 모두 삭제
    // set.clear();
    // console.log(set.size);

    // ========== 순회 ===========
    // 1. 고전적인 방식 forEach
    set.forEach(function (v, k, s) {
        console.log(`key : ${k}, value : ${v}, collection : ${s}`);
    });
    // 2. for of
    for (let v of set)
        console.log(`value : ${v}`);

    // 객체 추가
    let obj1 = {};
    let obj2 = {};

    let set2 = new Set();

    set2
        .add(obj1)
        .add(obj2);
    // 2가 나옴. obj1과 obj2는 다름.
    console.log(set2.size);
    console.log(set2);
}

// ========== Map ============
{
    let map = new Map();
    map.set("id", 1);
    console.log(map.size);
    console.log(map);
    map.set("title", "제목이다");
    console.log(map.size);
    console.log(map);

    // 아래와 같이 추가 X, - > 아이템을 추가할 땐 set만 사용
    //  아래는 모든 객체의 속성을 주는 것.
    //map["content"] = "hello";
    // map.content = "hello";
    // console.log(map.content);
    // console.log(map.size);
    // console.log(map);

    // has() - > 값 확인, delete() - > 삭제, clear() ->모두 삭제
    // get() - > 키의 벨류 값
    console.log(map.get("title"));

    // ========== 순회 ==============
    // 키 순회 for of
    for(k of map.keys())
        console.log(`key : ${k}`);
    
    // 값 순회 for of
    for(v of map.values())
        console.log(`value : ${v}`);

    // 1. 키와 값 순회 for of
    for(let [k,v] of map.entries())
        console.log(`key : ${k}, value : ${v}`);

    // 2. 키와 값 순회 forEach 고전적 방식
    map.forEach(function(v, k){
        console.log(`key : ${k}, value : ${v}`);
    });
}

// Function
// ======== Rest Parameter/Spread Operator
// ======== Default Value/Arrow Function
{
    // ========== Default Value =============
    function add(x=0,y=0) { // 기본값 넣어주기
    //function add(x=0, y=x) { 가능

    // 402번째 줄에서 넘겨준 1개의 인자가 출력
    // 394줄에서의 2개가 아님
        console.log(arguments.length);
        let result = x+y;
        return result;
    }
    console.log(add(3));


    // 함수로 기본값 대입.
    function getValue() {
        return 30;
    }

    function add2(x=0, y=getValue()) {
        console.log(x+y);
    }

    add2();
}

{
//============ Arrow Function ==========
// window.addEventListener("load",function(e) {
//    console.log("loaded"); 
// });

// 아래와 같이 함.
window.addEventListener("load",(e)=> {
   console.log("loaded"); 
});
}

// OOP
// 캡슐화(보호 모드?), 상속, 다형성(인터페이스?)

// 옛날 방식의 클래스 정의
/*{
    function Exam(kor=0,eng=0,math=0) {
        this.kor = kor;
        this.eng = eng;
        this.math = math;
            // 아래 함수의 문제점 - > 객체가 만들어질 때마다 함수가 계속해서 만들어짐.
            // exam.total === exam2.total - > false 
            // 이를 위한 해결 법 prototype 
            // this.total = function() {
            //     return this.kor + this.eng + this.math;
            // }
    }
        // prototype - > 모든 자바스크립트 객체의 틀을 정하는 것(extends).  옛날 방식이지만 실제 동작은 같음. 
    Array.prototype.asdasd = function() {
        return "protoArray asdasd";
    }
    let ar = [];
    console.log(ar.asdasd());
        
    let aa ={
        com : 30,
        art : 50,
        avg : function() {
            return "avg!!";
        }
    }
    
    Exam.prototype = aa;

        // Exam.prototype = {
        //     total : function() {
        //          return this.kor + this.eng + this.math;
        //     }
        // }
        // 위 아래 동일, 옛날 방식이지만 실제 동작은 같음. 
    Exam.prototype.total = function() {
        return this.kor + this.eng + this.math;
    }
    
    let exam3 = new Exam(10,10,10);
    console.log(exam3.avg());
    
    let exam = new Exam(20,30,50);
    let exam2 = new Exam(20,30,50);
    console.log(typeof exam);
    typeof exam == "object" ? console.log("yes") : console.log("no");
    exam ==  exam2 ? console.log("yes") : console.log("no");
    console.log(`total : ${exam.total()}`);
}
*/

// ====================== 현재 방식의 클래스 정의 ===================
{
    class Exam{
        // private 선언
        #kor;
        #eng;
        #math;
        // static 멤버
        static #count = 0;
        
        constructor(kor=0,eng=0,math=0){
            this.#kor = kor;
            this.#eng = eng;
            this.#math = math;
            Exam.#count++;
        }

// getter,setter - > get,set을 쓰면 호출시 속성처럼 사용 가능.
        get kor(){
            return this.#kor;
        }
        set kor(value){
            this.#kor = value;
        }
        get eng(){
            return this.#eng;
        }
        set eng(value){
            this.#eng = value;
        }

        get math(){
            return this.#math;
        }
        set math(value){
            this.#math = value;
        }

        static get count(){
            return Exam.#count;
        }
        

        #tot(){
            return 10000000;
        }
        total(){
            return this.#kor + this.#eng + this.#math+this.#tot();
        }
    }


    let exam = new Exam(20,30,50);
    let exam2 = new Exam(20,30,50);
    let exam3 = new Exam(20,30,50);
    console.log(`total : ${exam.total()}`);

    //    setter
    exam.kor = 5;
    //    getter
    console.log(exam.kor);
    // console.log(`kor : ${exam.kor}`);

    console.log(Exam.count);

}

// ====================== 상속 prototype - > extends =====================
{
    class Exam{
        // private 선언
        #kor;
        #eng;
        #math;
        // static 멤버
        static count = 0;
        
        constructor(kor=0,eng=0,math=0){
            this.#kor = kor;
            this.#eng = eng;
            this.#math = math;
            Exam.count++;
        }

// getter,setter - > get,set을 쓰면 호출시 속성처럼 사용 가능.
        get kor(){
            return this.#kor;
        }
        set kor(value){
            this.#kor = value;
        }
        get eng(){
            return this.#eng;
        }
        set eng(value){
            this.#eng = value;
        }

        get math(){
            return this.#math;
        }
        set math(value){
            this.#math = value;
        }

        get count(){
            return Exam.count;
        }
        

        #tot(){
            return 10000000;
        }
        total(){
            return this.#kor + this.#eng + this.#math;
        }
    }
    
    class NewlecExam extends Exam{
        #com;
        constructor(kor,eng,math,com){
            super(kor,eng,math);
            this.#com = com;
        }

        
        set com(value){
            this.#com = value;
        }
        get com(){
            return this.#com;
        }

        total(){
            return super.total()+this.#com;   
        }
    }

    let exam = new NewlecExam(1,2,3,4);
    console.log(`newlecExam kor : ${exam.kor}, eng : ${exam.eng} , math : ${exam.math}, com : ${exam.com}`);
    console.log(`newlecExam total : ${exam.total()}`);
    

}

/*
1. 캡슐화
class Exam{

    constructor(){}

}
2. private
class Exam{
    #kor;

}
3. staic & getter/setter
class Exam{
    static #count = 0;
    constructor(){
        Exam.#count++;
    }

    static get count(){
        return Exam.#count;
    }

    getCount(){
        return Exam.#count;
    }
}

new Exam();
new Exam();
console.log(Exam.count);

4. extends / super / override
*/

// ========= new.target Metaproperty
{
    function Exam(kor,eng,math) {
        console.log(this);
        console.log(this instanceof Exam);
        console.log(new.target);
        this.kor = kor;
        this.eng = eng;
        this.math = math;
    }
    let exam = new Exam(0,0,0);
    let exam1 = Exam(0,0,0);
}
{
    function Alert(selector) {
        this.section = document.querySelector(selector);
        this.btn1 = this.section.querySelector(".btn1");
        this.span = this.section.querySelector("div");
        this.x = 30;
        this.btn1.onclick = this.btn1Click;
    }

    Alert.prototype = {
        btn1Click : function() {
            console.log("aaa");
            // this가 의미가 없음. this가 뭔지 모름
            // this.span.innerHTML = "hi";
        },

        test : function(a) {
            console.log(`x : ${this.x}, a : ${a}`);
        }
    }
}
{
    window.addEventListener("load",function() {
        let alert = new Alert(".s1");
        // instance method, 객체를 통한 호출 x=30이 나옴.
        alert.test(3);

        // static method , 함수만 전달 받음 this가 뭔지 모름
        let f1 = alert.test;
        f1(3);

        // ========== 객체를 전달하는 함수 ===========
        // 1. 객체만 전달할 수 있는 함수 apply
        f1.apply(alert);

        // 2. 객체 + 다른 인자를 전달할 수 있는 함수 call
        f1.call(alert,10);
    });
}

// function의 3가지 종류에 따른 체크
// static / instance(instanceof) / constructor(new.target) - > new를 통해 만들어졌는가

// ======= iterator ========
{
    // function *iterator() {
    //     yield "안녕1";
    //     yield "안녕2";
    //     yield "안녕3";
    // }

    let data = [10,30,42,32,1,5];
    // 사실 iterator가 아닌 generator임. - > * - > iterator 반환.
    // function *a() {
    //     for(var i=0; i<data.length; i++)
    //         yield data[i];
    // }
    //let itr = a(); // generator이 iterator 객체를 반환

    function *iterator() {
        for(let i=0; i<data.length; i++)
            yield data[i];
    }

    let itr = iterator();
    // itr.next() - > {value : ? , done : ?} 식으로 반환함
    // 마지막 인덱스까지 갔을 때 done - > true 반환
    let result = itr.next();
    while(!result.done){
        console.log(result.value);
        result = itr.next();
    }

    // console.log(itr.next());
    // console.log(itr.next());
    // console.log(itr.next().value);

    // javaScript - > iterator을 구현할 필요가 없음
    // Generator이 iterator을 구현해줌. - > function *
    // -> iterator를 반환함
}

// iterator 실습 
{
    class List{
        #data
        constructor(){
            this.#data = [];
        }

        add(items){
            this.#data.push(items);
        }

        get(index){
            return this.#data[index];
        }

        *iterator(){ // generator 
            
            for(let i=0; i<this.#data.length; i++)
                yield this.#data[i];

        }
    }

    let list = new List();
    list.add(3);
    list.add(9);

    let it = list.iterator();
    let result = it.next();
    while(!result.done){
        console.log(result.value);
        result = it.next();
    }
    

    for(n of list.iterator())
        console.log(`n : ${n}`);
    
    let ar = [...list.iterator()]; // spread operator
    console.log(ar);

    function print(a,b,c) {
        console.log(`a: ${a}, b : ${b}, c : ${c}`);
    }

    print(...ar);

}
let age = "age2";
let person = {
    weight : 30,
    [age] : 15
};

console.log(person.weight);
console.log(person["weight"]);
let weight = "weight";
console.log(person[weight]);

console.log(person.age2);
console.log(person[age]);

// ========== Symbol ==========
{
    class List{
        #data
        constructor(){
            this.#data = [];
        }

        add(items){
            this.#data.push(items);
        }

        get(index){
            return this.#data[index];
        }

        *[Symbol.iterator](){ // generator 
            
            for(let i=0; i<this.#data.length; i++)
                yield this.#data[i];

        }
    }

    let list = new List();
    list.add(3);
    list.add(9);

    for(n of list)
        console.log(`n : ${n}`);
}

{
    // 난 라이브러리...누구든지 내 기능을 이용해서
    // 객체의 정보를 출력할 수 있습니다.
    // 단 그러려면 print 함수를 구현해 주세요~
    // 내가 약속한 함수가 구현되어있나?
    // 내가 정하겠어... 함수의 약속을
    //let print = Symbol('print');
    // Symbol.for("print");
    let print = Symbol.for();
    Symbol.for("asd");
    let asd = Symbol.for("asd");
    function printObject(obj){
        
        console.log(obj[print]());
    }

    class A /*implements Printable*/{
        constructor(){
            
        }
        // printObject와 약속한 print 함수인가?
        // 아님 우연치 않게 이름이 같은 것인지..
        [print](){ 
            console.log("hello");
        }
        // print(){
        //     console.log("heelo2");
        // }
    }

    class B{
        constructor(){

        }
        // printObject와 약속한 print 함수인가?
        // 아님 우연치 않게 이름이 같은 것인지..
        [print](){
            return 1+3;
        }

        f(){
            return 3;
        }
    }

    let a = new A();
    //console.log(a);
    printObject(a);
    console.log(A.prototype[asd]);
    console.log(B.prototype[print]);

    console.log(A.prototype[print]=== B.prototype[print]);
    console.log(A.prototype[print] == B.prototype[print]);
    console.log(A.prototype.print === B.prototype.print);
    console.log(A.prototype.print == B.prototype.print);



}


// ============ Async[Promise] =================
// 비동기 작업을 함수 중첩으로 해결하는 JavaScript
// 해결하기 위한 promise

{
    setTimeout(function() {
        console.log("호호");
        setTimeout(function() {
            console.log("하하");
        },1000);
    },1000);
}

// 동기식 요청
{
    function getNotice(id) {
        console.log('동기식 get 요청');
        return {id:1, title:'제목1'};
    }

    let notice = getNotice(1);
    console.log(`동기식 notice title : ${notice.title}`);

}
//  함수의 중첩이 깊어지는 기존 비동기 처리 방식
{
    
    function getNotice(id,call) {
        console.log('비동기식 get 요청');
        // 시간이 오래 걸리는 가정
        setTimeout(function() {
            
            let notice = {id:1, title:'제목1'};
            call(notice);
        },5000);
        console.log("???");
    
    }
  
    //  콜백 함수
    let notice = getNotice(1,function(notice) {
        console.log(`비동기식 notice title : ${notice.title}`);
    });

    console.log("메인이다."); // 메인 스레드는 계속 됨.
    
}

//  비동기 처리 방식 Promise
{
    function getNotice(id) {
        console.log('비동기식 promise get 요청');
        // 시간이 오래 걸리는 가정
        return new Promise(resolve =>{
            setTimeout(function() {
            
                let notice = {id:1, title:'제목1'};
                resolve(notice);
            },5000);
            console.log("???");
        })
    }

    let p = getNotice(1);
    p.then(
        function(notice) {
            console.log(`비동기식 notice title : ${notice.title}`);
        }
    )

    //  callback 함수
    // let notice = getNotice(1,function(notice) {
    //     console.log(`비동기식 notice title : ${notice.title}`);
    // });

    // ======= promise 호출방법 1. - 비동기
    // let promise = getNotice(1);
    // promise.then(function(notice) {
    //     console.log(`비동기식 promise notice title : ${notice.title}`);
    // })

    // ======= promise 호출방법 2. - 동기
    {
        // (function(){}();) 함수 바로 호출
        (async function(){
            
        let notice = await getNotice(1);
        console.log(`동기식 promise notice title : ${notice.title}`);
        console.log("promise 동기 메인이다."); // 메인 스레드는 계속 됨.
        }());

        console.log("메인이다."); // 메인 스레드는 계속 됨.
    }
    
}

// promise 성공시, 실패시
{
    function getNotice(id) {
        console.log('비동기식 promise get 요청');
        
        // 시간이 오래 걸리는 가정
        // resolove - > 성공시, reject - > 실패시 
        return new Promise((resolve,reject) =>{
            setTimeout(function() {
            
                let notice = {id:1, title:'제목1'};
                resolve(notice);
                //reject({status : "실패", message : "너무 큰 수"});
            },5000);
            console.log("???");
        })
    }

    // getNotice(1)
    // .then(
    //     function(value) {
    //         console.log(value);
    //     },
    //     function(value) {
    //         console.log(value);
    //     }
    // ) 

    //           ||

    // let promise = getNotice(1);
    // promise
    // .then(
    //     function(value) {
    //         console.log(value);
    //     },
    //     function(value) {
    //         console.log(value);
    //     }
    // )

    // then의 중첩 - > 분쇄 코드, 기능 나누기.
    let promise = getNotice(1);
    promise
    .then(                              // notice 받아서 title만 반환
        function(notice) {
            return notice.title;
        },
        function(error) {
            console.log(error);
            throw error.message;
        }
    )
    .then(                              // 받은 notice.title 출력
        function(title) {
            console.log(title);
            console.log("정상");
        },
        function(message) {
            console.log("오류");
            console.log(message);
        }

    )
}

// promise 모두 모아 실행 & 예외
{

    function nextInt(max){
        return Math.floor(Math.random()*max);
    }

    function getNotice(id) {
        console.log('비동기식 promise get 요청');
        
        // 시간이 오래 걸리는 가정
        // resolove - > 성공시, reject - > 실패시 
        return new Promise((resolve,reject) =>{
            
            setTimeout(function() {
                let notice = {id:1, title:'제목1'};
                try{
                    
                    let value = nextInt(10);
                    console.log(value);
                    if(value > 5)
                        throw new Error("big num");
                }
                catch(msg){
                    reject({status : "실패", message : "너무 큰 수"});
                }

                resolve();
            
                    
            },5000);
            console.log("???");
        })
    }

    let promise1 = getNotice(1);
    // promise1
    // .then(function() {
    //     console.log("promise1 성공");
    // })

    let promise2 = getNotice(1);
    // promise2
    // .then(function() {
    //     console.log("promise2 성공");
    // })

    let promiseAll = Promise.all([promise1,promise2]);
    promiseAll
    .then(()=>
        console.log("promise all 성공")
    );
    //              ||
    // Promise.all([
    //     getNotice(1),
    //     getNotice(1)
    // ])
    // .then(function() {
    //     console.log("promise all 성공");
    // })
}


// =========== Promise 정리(then)===========

{
    function getNotice(page){
        return new Promise((resolve, reject)=>{
            setTimeout(function(){
                let notice = {id:1, title:"notice title"};
                //resolve(notice);
                reject("aaaa");
                console.log("작업완료");
            }, 1000);
        });
    }

    //let notice = getNotice();
    let p = getNotice(1);
    //-----------------------
    p
    .then(
        notice=>{
            console.log("resolve 1 작업");
            console.log(notice);
            return notice.title;
        },
        reason=>{
            console.log("reject 1 작업");
            console.log(reason);
        }
    )
    .catch(
        reason =>{
            console.log(`catch 1 : ${reason}`);
        }
    )
    .then(
        title=>{
            console.log("resolve 2 작업");
            console.log(title);
            return title.length;
        },
        reason=>{
            console.log("reject 2 작업");
            console.log(reason);
           
        }
    )
    .catch(
        reason =>{
            console.log(`catch 2 : ${reason}`);
        }
    )
    .then(
        count=>{
            console.log("resolve 3 작업");
            console.log(count);
        },
        reason=>{
            console.log("reject 3 작업");
            console.log(reason);
        }
    )
    .catch(
        reason =>{
            console.log(`catch 3 : ${reason}`);
        }
    )
}

{
    // Promise.all();   -- > 모든 비동기작업이 끝났을 때
    // Promise.any();   -- > 여러 개의 비동기작업중 가장 빨리 끝난거
    // Promise.resolve();
    // Promise.reject();

    // 꼬리물기
    // let notice = {id:1, title:"title"};
    // Promise
    // .resolve(notice)
    // .then(notice=>{
    //     console.log(notice)
    //     return notice.title;
    // })
    // .then(title=>{
    //     console.log(title);
    // });

    let p1 = 1;
    let p2 = new Promise((resolve)=>{
        setTimeout(function(){resolve(600);},1000);
    });
    let p3 = new Promise((resolve)=>{
        setTimeout(function(){resolve(300);},500);
    });

    Promise.all([p1,p2,p3])
    .then((values=>{
        console.log(values);
        console.log(values[2]);
    }));

}