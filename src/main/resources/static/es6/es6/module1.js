import {test as m2test} from "./module2.js";
import exam from './exam.js';
// 모듈 - > 부품의 고립화
// 아무도 못 보는 영역

// export - > 외부에서 사용할 수 있는 키워드
// default - > 기본적으로 외부에서 사용할 수 있는 키워드
export default function test() {
    console.log("module1 test");
    exam.kor = 100;
    console.log(exam);
}

export function test2() {
    console.log("module1 test2");
    m2test();
}

export function test3() {
    console.log("module1 test3");
}

// export X - > 외부에서 사용 불가능
function test4() {
    console.log("module1 test4");
}