

// 아래 방식의 문제점 - > 한개의 function만 담음 - > 덮어쓰기 됨. - > 즉 - > 여러개의 onload중 마지막에 있는 함수만 담겨짐. 
// window.onload =  function(){
//     var btnPrint = document.getElementById("btn-print");
//     btnPrint.onclick = printResult;

//     function printResult(){
//         var x,y;
//         x = prompt("x 값 입력",0);
//         y = prompt("y 값 입력",0);
//         var btnPrint = document.getElementById("btn-print");
//         btnPrint.value=parseInt(x)+parseInt(y);
//     }
// }

window.addEventListener("load", function(){
    var btnPrint = document.getElementById("btn-print");
    btnPrint.onclick = printResult;

    function printResult(){
        var x,y;
        x = prompt("x 값 입력",0);
        y = prompt("y 값 입력",0);
        var btnPrint = document.getElementById("btn-print");
        btnPrint.value=parseInt(x)+parseInt(y);
    }
}
);