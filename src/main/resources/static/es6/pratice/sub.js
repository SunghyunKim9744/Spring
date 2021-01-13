window.onload = function(){

    // 버튼1,2 객체 참조.
    var btn1 = document.getElementsByTagName("input")[0];
    var btn2 = document.getElementsByTagName("input")[1];

    // span의 자식인 text노드를 바꾸기 위해 부모인 span객체 참조
    var countSpan = document.getElementsByClassName("count-span")[0];

    // 지역 2개의 text노드가 필요하기 때문에 부모인 span객체 참조
    var span1 = document.getElementsByTagName("span")[1];
    var span2 = document.getElementsByTagName("span")[2];

    // 부모 창인 main의 input에 지역을 넣기 위해 부모의 input객체 참조
    var adrInput = opener.document.getElementsByClassName("address-input")[0];

    // 처음 시간 초기화
    var count = 3;

    // 초기화된 시간 countSpan의 자식 text노드에 담기
    countSpan.innerText = count;

    // 지역명을 담을 변수
    var addr = null;

    // 지역명을 담고, 1초마다 setInterval 실행하고 0이 됐을 때,
    // 지역명을 부모창의 input에 넣고, setInterval 중지 후 창 닫기.
    btn1.onclick = function() {
        addr = span1.innerText; 
        var timerId = setInterval(function () {
            count--;
            countSpan.innerText = count;
            if(count == 0){
                adrInput.value = addr;
                clearInterval(timerId);
                window.close();
            }     
        }, 1000);  
    }

    btn2.onclick = function() {
        addr = span2.innerText;
        var timerId = setInterval(function () {
            count--;
            countSpan.innerText = count;
            if(count == 0){
                adrInput.value = addr;
                clearInterval(timerId);
                window.close();
            }  
        }, 1000);  
    }
};