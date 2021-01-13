window.addEventListener("load",function() {

    function inputNum() {
        let x;
        x = prompt("생각한 수를 입력하세요.",0);
        // x=parseInt(x);
        return x;
    }

    function solveNum() {
        let num = inputNum();
        console.log("생각한 숫자 푸는 중");
        return new Promise((resolve,reject)=>{
            setTimeout(function() {
                resolve(num);
            },2000);
        })        
    }

    let promise = solveNum();

    promise
    .then   // 1단계 - > 생각한 수 *9
    (
        (num)=>{
            let firstNum = {first:num*9,num};
            console.log(`first : ${firstNum.first}`);
            return firstNum;
        }
        
        // function (num) {
        //     let firstNum = {first:num*9,num};
        //     console.log(`first : ${firstNum.first}`);
        //     return firstNum;
        // }
    )
    .then    // 2단계 - > 1단계의 각 자리수 더하기
    (
        (num)=>{
            let secondNum = {second:(parseInt(num.first/10))+parseInt((num.first%10)),num:num.num};
            console.log(`second : ${secondNum.second}`);
            return secondNum;
        }
        // function (num) {
        //     let secondNum = {second:(parseInt(num.first/10))+parseInt((num.first%10)),num:num.num};
        //     console.log(`second : ${secondNum.second}`);
        //     return secondNum;
        // }
    )
    .then     // 3단계 - > 2단계 + 처음 생각한 수 더하기
    (
        (num)=>{
            let thirdNum = parseInt(num.num) + num.second;
            console.log(`third : ${thirdNum}`);
            return thirdNum;
        }
        // function (num) {
        //     let thirdNum = parseInt(num.num) + num.second;
        //     console.log(`third : ${thirdNum}`);
        //     return thirdNum;
        // }
    )

    .then          // 4단계 - > 3단계 수 - 9
    (
        (num)=>{
            let result = num - 9;
            alert(`답은 ${result}입니다`);
            console.log(`답은 ${result}입니다`);
        }
        // function (num) {
        //     let result = num - 9;
        //     console.log(`답은 ${result}입니다`);
        // }
    )
    


    // 1. *9     5 - > 45 
    // 2. 각 자리수 더하기    - >  9 
    // 3. 2번 + 생각한 수 더하기.    - > 14
    // 4. 3번 결과값에서 9 빼기   - > 14 - 9 - > 5

    // 1단계 - > 정상적으로 입력했을 때
    // 2단계 - > 1~9 이외의 숫자를 입력할 시
    // 3단계 - > 숫자를 입력안했을 때
    // 4단계 - > 2,3단계 취합
})