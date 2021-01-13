// 모듈 - > 부품의 고립화
// 아무도 못 보는 영역

// export - > 외부에서 사용할 수 있는 키워드
// default - > 기본적으로 외부에서 사용할 수 있는 키워드
export function test() {
    console.log("module2 test");
}

export function test2() {
    console.log("module2 test2");
}

export function test3() {
    console.log("module2 test3");
}

// export X - > 외부에서 사용 불가능
function test4() {
    console.log("module2 test4");
}