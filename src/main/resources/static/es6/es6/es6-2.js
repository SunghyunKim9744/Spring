// 모듈 경로를 자세히 써야함, html에서 src type=module 해야함.
//import f1,{test3,test2} from './module1.js';
// 다른 스크립트의 default 키워드가 붙은 것을 가져옴, 다른 스크립트의 함수명과 상관X
import f1 from './module1.js';
//f1();
// 다른 스크립트의 export 키워드가 붙은 것을 가져옴, 다른 스크립트의 함수명과 같아야함.
import { test3, test2 } from './module1.js';
test2();
//test3();
// 클래스 갖고오기
//import Exam from './exam.js';

// exam 객체 갖고오기 - > 전역 변수 같이 사용.
import exam from './exam.js';

//let exam = new Exam(1,2,3);
console.log(exam.total());
console.log(exam.avg());

setTimeout(() => {
    console.log(exam.total());
    console.log(exam.avg());
}, 1000);
f1();

// 동적으로 처리할 시 import 함수 - > 고립성X
// ex - > import("./api/notice/list")
let value = Math.floor(Math.random()*10);
// console.log(value);
// if(value>5)
//     import("./json.js");

if(value>5){
    console.log(value);
    import("./module1.js")
    .then(({default:f1,test2}) =>{
        f1();
        test2();
    })
}

(async ()=>{
    if(value>5){
        const {default:f1, test2} = await import("./module1.js");
        f1();
        test2();
    }
})();





