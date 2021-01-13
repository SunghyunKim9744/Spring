
//================================  s13   ==================================
// 마우스 이벤트 : 드래그 드랍
window.addEventListener("load", function () {
    var section = document.querySelector("#s13");
    var container = section.querySelector(".container");
    var box = container.querySelector(".box");

    var down = false;
    // var offX = 0;
    // var offY = 0;
    var offset = {x:0, y:0};
    // 박스의 위치를 알기 위한 이벤트
    box.onclick = function(e) {
        
    }

    container.onmousemove = function(e) {
        if(down){
            console.log("client X : "+e.x);
            console.log("client Y : "+e.y);
    
            box.style.left = e.x+"px";
            box.style.top = e.y+"px";
        }
        
    }

     
    container.onmousedown = function() {
        console.log("mousedown");
        down=true;
    }
    
    container.onmouseup = function() {
        console.log("mouseup");
        down=false;
    }

    // // 박스 움직이기 - > 컨테이너로 바꿔야함.
    // box.onmousemove = function(e) {
    //     // screen - > 화면상의 위치
    //     // client - > 문서상의 위치
    //     console.log("screen X : "+e.screenX);
    //     console.log("screen Y : "+e.screenY);
    //     // clientX,Y 는 e.x, e.y로 표기 가능
    //     console.log("client X : "+e.x);
    //     console.log("client Y : "+e.y);

    //     box.style.left = e.x+"px";
    //     box.style.top = e.y+"px";
    // }

    // // 눌렀을 때
    // box.onmousedown = function() {
    //     console.log("mousedown");
    // }
    // // 뗏을 때
    // box.onmouseup = function() {
    //     console.log("mouseup");
    // }
    // // 들어 갔을 때(enter 보다 먼저 실행)
    // box.onmouseover = function() {
    //     console.log("mouseover");
    // }
    // // 나왔을 때 (leave 보다 먼저 실행)
    // box.onmouseout = function() {
    //     console.log("mouseout");
    // }
    // // 들어 갔을 때(over 보다 나중에 실행)
    // box.onmouseenter = function() {
    //     console.log("mouseenter");
    // }
    // // 나왔을 때 (out 보다 나중에 실행)
    // box.onmouseleave = function() {
    //     console.log("mouseleave");
    // }
    // // 움직일 때
    // box.onmousemove = function() {
    //     console.log("mousemove");
    // }

   
});

//================================  s12   ==================================
// 트리거
window.addEventListener("load", function () {
    var section = document.querySelector("#s12");
    var fileBtn = section.querySelector(".file-button");
    var file = section.querySelector("input[type=file]")
    fileBtn.addEventListener("click",function() {
        var event = new MouseEvent("click",{
            'view':window,
            'bubbles':true,
            'cancelable':true
        });
        file.dispatchEvent(event);
    });
});


//================================  s11   ==================================
// Ajax 다루기
window.addEventListener("load", function () {
    var section = document.querySelector("#s11");
    var button1 = section.querySelector(".button1");
    var tbody = section.querySelector("tbody");
    var pager = section.querySelector(".pager");

    pager.onclick = function(e) {
        e.preventDefault();
        
        // e.target - > a 태그
        // innerText - > a 태그의 텍스트
        var page = parseInt(e.target.innerText);
        console.log(page);
        load(page);
        
    }

    button1.onclick = function () {
        load();
        // var request = new window.XMLHttpRequest();

        // 비동기적으로 처리하기 위한 콜백
        // 데이터를 요청하는 작업이 끝났을 때 함수 호출
        //  - > 콜백
        // onload - > load가 성공적으로 될 시
        //             방식 2
        // request.onload = function () {
        //     var notices = JSON.parse(request.responseText);
        //     console.log(notices);
        //     for (var i = 0; i < notices.length; i++) {
        //         var tr = '<tr> \
        //                         <td>'+ notices[i].id + '</td> \
        //                         <td><a href="detail.html">'+ notices[i].title + '</a></td> \
        //                         <td>'+ notices[i].writerId + '</td> \
        //                         <td> \
        //                         2019-08-18 \
        //                         </td> \
        //                         <td>146</td>\
        //                       </tr>';

        //         tbody.insertAdjacentHTML('beforeend', tr);
        //     }
        // }

        //              방식 1
        // onreadystatechange  - > 스테이트 상태가 변할때 마다 호출
        // 0 - >
        // 1 - > 
        // 2 - >
        // 3 - >
        // 4 - > 성공적인 로드
        //                  
        // request.onreadystatechange = function() {
        //     // console.log(request.readyState);
        //     // console.log(request.responseText);
        //     if(request.readyState==4){
        //         var notices = JSON.parse(request.responseText);
        //         console.log(notices);
        //         for(var i=0; i<notices.length; i++){
        //             var tr = '<tr> \
        //                     <td>'+notices[i].id+'</td> \
        //                     <td><a href="detail.html">'+notices[i].title+'</a></td> \
        //                     <td>'+notices[i].writerId+'</td> \
        //                     <td> \
        //                     2019-08-18 \
        //                     </td> \
        //                     <td>146</td>\
        //                   </tr>';
        //         tbody.insertAdjacentHTML('beforeend',tr);
        //         }

        //     }

        // }
        // open 3번째 인자 true - > 동기형, false - > 비동기형(기본값)
        // 요청은 우선 동기적으로 해야함.
        // request.open("GET", "/api/board/notice/list?p="+page, true);
        // request.send();

        // alert(request.responseText);



    }
    function load(page) {
        tbody.innerHTML="";
        if(page == undefined)
            page=1;
        var request = new window.XMLHttpRequest();
        request.onload = function () {
            var notices = JSON.parse(request.responseText);
            console.log(notices);
            for (var i = 0; i < notices.length; i++) {
                var tr = '<tr> \
                                <td>'+ notices[i].id + '</td> \
                                <td><a href="detail.html">'+ notices[i].title + '</a></td> \
                                <td>'+ notices[i].writerId + '</td> \
                                <td> \
                                2019-08-18 \
                                </td> \
                                <td>146</td>\
                                <td><a href="">수정</a><a href="">삭제</a></td> \
                              </tr>';

                tbody.insertAdjacentHTML('beforeend', tr);
            }
        }
        request.open("GET","/api/board/notice/list?p="+page, true);
        request.send();
    }
});

//================================  s10   ==================================
// 마우스 이벤트 객체 with Gallery
window.addEventListener("load", function () {
    var section = document.querySelector("#s10")
    var prevBtn = section.querySelector(".prev-button")
    var nextBtn = section.querySelector(".next-button");
    var ul = section.querySelector("ul");


    var current = ul.querySelector("li:nth-child(4)");

    var showRoom = section.querySelector(".show-room");
    var showRoomImg = section.querySelector(".show-room img");

    var currentImg;

    var index = 0;

    showRoomImg.style.transition = "transform 2000ms";
    // notify(함수를 호출하기 전에 확인하는 것)에서 호출순서정하기
    // addEventListener 3번째 인자 true
    showRoom.addEventListener("click", function (e) {
        showRoomImg.style.transform = "scale(1,1)";
        console.log("부모다");

    }, true);

    // 이벤트 버블링에 대한 문제와 해결 방법

    // showRoom > showRoomImg

    // showRoom.onclick = function(e){
    //     showRoomImg.style.transform="scale(1,1)";
    //     console.log("부모다");
    // };

    showRoomImg.onclick = function (e) {
        // 버블링 막기 - > stopPropagation
        // e.stopPropagation();
        e.target.style.transform = "scale(1.2,1.2)";
        console.log("자식이다");
    };

    // 3. 더 나은 방법 -> 부모 객체에 이벤트 넘겨주기. - > 이벤트 버블링
    // ul>li>img , img를 클릭하는 이벤트가 li->ul로 전달
    ul.onclick = function (e) {
        if (e.target.tagName != "IMG")
            return;
        current.classList.remove("current");
        current = e.target.parentElement;
        current.classList.add("current");
        var newImg = current.firstElementChild;
        showRoomImg.src = newImg.src;
    }
    // -------------------------------------------------

    // 2. 조금 개선한 방법
    // var imgClickHandler = function(e){

    //     current.classList.remove("current");
    //     current = e.target.parentElement;
    //     current.classList.add("current");

    //     var newImg = current.firstElementChild;
    //     showRoomImg.src = newImg.src;
    // }
    // var imgs = section.querySelectorAll("ul img");
    // for(var i=0; i<imgs.length; i++){
    //     imgs[i].onclick = imgClickHandler;
    // }

    // -------------------------------------------------

    // 1. 가장 복잡하고 가장 바람직하지 않은 방법
    // var imgs = section.querySelectorAll("ul img");
    // for(var i=0; i<imgs.length; i++){
    //     imgs[i].onclick = function(e){


    //         current.classList.remove("current");
    //         current = e.target.parentElement;
    //         current.classList.add("current");

    // 현재 선틱된 녀석
    //         var newImg = current.firstElementChild;
    //         showRoomImg.src = newImg.src;
    //     }
    // }

    prevBtn.onclick = function (e) {

        // 기본 행위를 막는 함수 preventDefault
        // ex - > submit은 전송 막기 
        // a 태그의 페이지 이동 행위 막기
        e.preventDefault();
        if (current.previousElementSibling == null) {
            alert("갈 곳이 없습니다");
            return;
        }

        index++;
        var x = index * 100 + "px";
        ul.style.transform = "translateX(" + x + ")";

        current.classList.remove("current");
        current = current.previousElementSibling;
        current.classList.add("current");
        currentImg = current.querySelector("img");
        showRoomImg.src = currentImg.src;

    };

    nextBtn.onclick = function (e) {

        // 기본 행위를 막는 함수 preventDefault
        // ex - > submit은 전송 막기 
        // a 태그의 페이지 이동 행위 막기
        e.preventDefault();
        if (current.nextElementSibling == null) {
            alert("갈 곳이 없습니다");
            return;
        }

        index--;
        var x = index * 100 + "px";
        ul.style.transform = "translateX(" + x + ")";
        current.classList.remove("current");
        current = current.nextElementSibling;
        current.classList.add("current");

        currentImg = current.querySelector("img");
        showRoomImg.src = currentImg.src;

    };
});

//================================  s9-1   ==================================
// 동적으로 노드 추가,삭제,변경하기 - > 노드 조작(좀 더 나은 방식 - > 최종 방식)
window.addEventListener("load", function () {
    var section = document.querySelector("#s9-1")
    var container = section.querySelector(".container");
    var addBtn = section.querySelector(".add-button")
    var delBtn = section.querySelector(".del-button");
    var replaceBtn = section.querySelector(".replace-button");
    var changeBtn = section.querySelector(".change-text-button");

    var index = 1;
    addBtn.onclick = function () {

        // 최종 방식 insertAdjacentHTML 사용 - > 노드가 추가되는 방식
        var item = '<span class="item"> \
                    <input type="checkbox"> \
                    <span class="label">안녕'+ (index++) + '</span> \
                </span>';

        container.insertAdjacentHTML('beforeend', item);


        // 대안 1 innerHTML 속성사용 - > 수행 성능이 느림 -> 추가할 때 다시 처음부터 만드는 방식

        // 엔터도 구분자로 사용되기 때문에 한칸띄고 \ 이용
        // var item = '<span class="item"> \
        //                 <input type="checkbox"> \
        //                 <span>안녕'+(index++)+'</span> \
        //             </span>';

        // 수행 성능이 느림 -> 추가할 때 다시 처음부터 만드는 방식
        // container.innerHTML+=item;


    };

    delBtn.onclick = function () {

        // ------- 선택 삭제 방식을 통한 구현 ---------

        // 선택된 노드 찾기 - > 보다 바람직한 방법 - > 슈도 클래스 이용 
        var chks = container.querySelectorAll("input[type=checkbox]:checked");

        // 선택된 노드 찾기 - > 바람직하지 않은 방법 - > 직접 모든 노드를 순회 하는 방식

        // 1. item 목록 얻기
        // var items = container.children;

        // 2. item을 순회하면서 checkbox 얻기
        // 3. checkbox의 상태가 선택되어 있는 것들을 추려서 배열에 담기.
        // var chks =[];
        // for(var i=0; i<items.length; i++){
        //     var checkbox = items[i].querySelector("input[type='checkbox']");
        //     if(checkbox.checked)
        //         chks.push(checkbox);
        // }

        // 4. 콘솔 출력
        console.log(chks);

        for (var i = 0; i < chks.length; i++) {
            chks[i].parentElement.remove();
        }
        // container.lastElementChild.remove();
    };

    replaceBtn.onclick = function () {

        var chks = container.querySelectorAll("input[type=checkbox]:checked");
        if (chks.length != 2) {
            alert("2개만 선택하세요");
            return;
        }

        var item1 = chks[0].parentElement;
        var item2 = chks[1].parentElement;

        var before = item2.previousElementSibling;

        item1.replaceWith(item2);

        before.insertAdjacentElement('afterend', item1);


    };

    changeBtn.onclick = function () {
        var chks = container.querySelectorAll("input[type=checkbox]:checked");
        for (var i = 0; i < chks.length; i++) {
            var parent = chks[i].parentNode;
            var textSpan = parent.querySelector(".label");
            textSpan.innerText = "변경";
        }
    }
});

//================================  s9   ==================================
// 동적으로 노드 추가,삭제,변경하기
window.addEventListener("load", function () {
    var section = document.querySelector("#s9")
    var container = section.querySelector(".container");
    var addBtn = section.querySelector(".add-button")
    var delBtn = section.querySelector(".del-button");
    var replaceBtn = section.querySelector(".replace-button");

    var index = 1;
    addBtn.onclick = function () {

        //              1. 텍스트 노드
        // 1. 텍스트 노드 생성 - > documnet에서 노드 생성
        // var text = document.createTextNode("안녕");
        // 2. 컨테이너에 노드 추가 - > 노드에서 노드가 갖고 있는 appendChild
        // container.appendChild(text);

        //              2. 엘리먼트 노드 - > 이전 기능 appendChild
        // 1. span 엘리먼트 객체 생성
        // var span = document.createElement("span");
        // 2. 텍스트 노드 생성
        // var text = document.createTextNode("안녕"+index++);
        // 3. span에 2번에 생성한 텍스트 노드 추가
        // span.appendChild(text);
        // 4. 컨테이너에 span 노드 추가
        // container.appendChild(span);

        //              2. 엘리먼트 노드 - > 새로운 기능 append
        // 1. span 엘리먼트 객체 생성
        var span = document.createElement("span");
        // 2. 텍스트 노드를 생성하면서 span에 추가
        span.append("안녕" + index++);
        // 3. 컨테이너에 span 노드 추가 - > 여러개도 넣을 수 있음.
        // container.append(span,"하이룽");
        container.append(span);


    };

    delBtn.onclick = function () {
        // 컨테이너 안에 있는 span 엘리먼트 노드 삭제
        // 이전 기능
        // container.removeChild(container.lastElementChild);

        // 새로운 기능
        container.lastElementChild.remove();
    };

    replaceBtn.onclick = function () {

        // 2번째와 세번째 바꾸기
        var newOne = container.children[2];
        var oldOne = container.children[1];
        container.replaceChild(newOne, oldOne);

        // 이전 기능
        // container.insertBefore(oldOne,newOne.nextElementSibling);

        // 새로운 기능
        newOne.insertAdjacentElement('afterend', oldOne);

        // container.insertBefore

        // 1번째와 마지막을 바꾸기
        // var newOne = container.lastElementChild;
        // var oldOne = container.firstElementChild;
        // oldOne - > newOne으로 대체가 됨 - > 개수가 줄음. oleOne을 다시 넣어줘야함.
        // container.replaceChild(newOne,oldOne);

        // container.appendChild(oldOne);
    };
});

//================================  s8-1   ==================================
// 동적으로 엘리먼트 노드 css 속성 변경하기
window.addEventListener("load", function () {
    var section = document.querySelector("#s8-1")
    var prevBtn = section.querySelector(".prev-button")
    var nextBtn = section.querySelector(".next-button");
    var ul = section.querySelector("ul");


    // var lis = ul.querySelectorAll("li");

    // var current = ul.querySelector("li");
    // var current = ul.querySelector("li:first-child");

    var current = ul.querySelector("li:nth-child(4)");

    var showRoomImg = section.querySelector(".show-room img");
    var currentImg;

    var index = 0;

    prevBtn.onclick = function () {
        if (current.previousElementSibling == null) {
            alert("갈 곳이 없습니다");
            return;
        }

        index++;
        var x = index * 100 + "px";
        ul.style.transform = "translateX(" + x + ")";

        current.classList.remove("current");
        current = current.previousElementSibling;
        current.classList.add("current");
        currentImg = current.querySelector("img");
        showRoomImg.src = currentImg.src;

    };

    nextBtn.onclick = function () {

        if (current.nextElementSibling == null) {
            alert("갈 곳이 없습니다");
            return;
        }

        index--;
        var x = index * 100 + "px";
        ul.style.transform = "translateX(" + x + ")";
        // 기존의 커렌트 클래스명 제거
        current.classList.remove("current");
        current = current.nextElementSibling;

        // 일반적으로 html속성과 이름이 동일하지만 class는 예약어임 
        // current.class = "current"; X
        // current.className - > 기존이름의 클래스가 있다면 바꿔버림 - >추가X
        // 기존의 클래스명 + 추가할 클래스명
        current.classList.add("current");

        // 단, 아래는 좋은 방법이 아님.  위의 방식으로 하기 
        // 정해진 css에서 current만 바꿔주는게 좋음 - > class 이름만 변경+추가
        // current.style.opcity = "1";
        // current.style.border = "1px solid green";

        // 속성명이 유효하지 않을 때 2가지 방법.
        // 1. [""]
        // 2. 낙타표기법
        // current.style["border-width"] = "2px";
        // current.style.borderColor = "red";
        currentImg = current.querySelector("img");
        showRoomImg.src = currentImg.src;

    };
});

//================================  s8   ==================================
// 동적으로 엘리먼트 노드 변경하기. - > img src 속성 변경
window.addEventListener("load", function () {
    var section = document.querySelector("#s8")
    var prevBtn = section.querySelector(".prev-button")
    var nextBtn = section.querySelector(".next-button");
    var ul = section.querySelector("ul");

    // var lis = ul.querySelectorAll("li");

    // var current = ul.querySelector("li");
    var current = ul.querySelector("li:first-child");


    prevBtn.onclick = function () {
        current.innerText = "호호호";
        current = current.previousElementSibling;
    };

    nextBtn.onclick = function () {
        current = current.nextElementSibling;
        var img = current.firstElementChild;
        img.src = "../images/img1.jpg";

    };
});

//================================  s7   ==================================
// 선택자
window.addEventListener("load", function () {
    var section = document.querySelector("#s7")
    var prevBtn = section.querySelector(".prev-button")
    var nextBtn = section.querySelector(".next-button");
    var ul = section.querySelector("ul");

    // var lis = ul.querySelectorAll("li");

    var current = ul.querySelector("li:first-child");
    current.innerText = "하하하";
    prevBtn.onclick = function () {
        current.innerText = "호호호";
        current = current.previousElementSibling;
    };

    nextBtn.onclick = function () {
        current = current.nextElementSibling;
        current.innerText = "하하하";
    };
});

//================================  s6   ==================================

window.addEventListener("load", function () {
    var section = document.getElementById("s6");
    var prevBtn = section.getElementsByClassName("prev-button")[0];
    var nextBtn = section.getElementsByClassName("next-button")[0];
    var ul = section.getElementsByTagName("ul")[0];

    // ul의 자식 노드들 li+text+a
    //  console.log(ul.childNodes.length);

    // 모든 노드를 대상으로 순회(childNodes)
    // for(var i=0; i<ul.childNodes.length; i++)
    //     console.log(ul.childNodes[i].nodeType);

    // 엘리먼트 노드만 대상으로 순회(children)
    for (var i = 0; i < ul.children.length; i++)
        console.log(ul.children[i].nodeType);

    var current = ul.firstElementChild;
    current.innerText = "하하하";
    prevBtn.onclick = function () {
        current.innerText = "호호호";
        current = current.previousElementSibling;
    };


    nextBtn.onclick = function () {
        current = current.nextElementSibling;
        current.innerText = "하하하";
    };
});

//================================  s5   ==================================

window.addEventListener("load", function () {
    var section = document.getElementById("s5");
    var urlInput = section.getElementsByClassName("url-input")[0];
    var btn1 = section.getElementsByClassName("button1")[0];

    btn1.onclick = function () {
        // window.location - > 입력된 url로 가기 - > url 객체
        // location.href = "http://www.naver.com";
        // replace - > 기록 X- > 뒤로가기가 안됨 
        location.replace(urlInput.value);
        // 원래 있던 창으로 돌아가기(뒤로가기) reload
        // location.reload(); 

        // history 객체 - > 뒤로가기, 앞으로 가기
    };
});

//================================  s4   ==================================

window.addEventListener("load", function () {
    var section = document.getElementById("s4");
    var btn1 = section.getElementsByClassName("btn1")[0];
    var win = section.getElementsByTagName("iframe")[0].contentWindow;

    btn1.onclick = function () {
        var btn1InIFrame = win.document.getElementsByTagName("input")[0];
        btn1InIFrame.value = "호호호";
    };
});

//================================  s3   ==================================

// name으로 얻지말고 id를 전역변수처럼 얻고(section), class를 이용하여 element 객체 참조하기.

window.addEventListener("load", function () {
    var section = document.getElementById("s3");
    var searchButton = section.getElementsByClassName("search-button")[0];

    var win;

    searchButton.onclick = function () {
        // 새로운 창 뜨게 하기 - > window.open
        // open("http://www.naver.com");

        // 너비 300, 높이 200인 창으로 뜨게 하기. 
        // open("ex-dom-s3zip.html","_blank","width=300px,height=200px");

        // win - > 새로 만들어진 창에 접근, opener - > 만들어진 창에서 부모 창에 접근.
        // 새로 만들어진 창이 로드되었을 때, 그 창에 있는 객체를 사용해야함
        win = open("ex-dom-s3zip.html", "_blank", "width=300px,height=200px");
        // win.onload = function(){
        // btn1 - > ex-dom-s3zip.html에 있는 input 객체
        //     var btn1 = win.document.getElementsByTagName("input")[0];
        //     btn1.value="하하하";
        // }
        //      ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        // ex-dom-s3zip.html의 속성이 변하므로 ex-dom-s3zip에서 스크립트로 하는게 바람직.
    }
}
);

//================================  s2   ==================================
window.addEventListener("load", function () {
    var section = document.getElementById("s2");
    var countdownButton = section.getElementsByTagName("input")[0];
    var countSpan = section.getElementsByClassName("count-span")[0];

    var count = 5;
    // countSpan의 자식텍스트에다 count 넣기. + 객체 초기화
    countSpan.innerText = count;
    countdownButton.onclick = function () {
        //      카운트 다운 처리. window.setTimeout(함수,시간)
        // setTimeout(function () {
        //     count--;
        //     countSpan.innerText = count;
        // }, 3000);

        //      1초마다 실행됨. window.setInterval(함수,시간)
        // setInterval(function () {
        //     count--;
        //     countSpan.innerText = count;
        // }, 1000);

        //      Interval을 종료하기 위한 함수 clearInterval - > timerId 변수 준비 
        var timerId = setInterval(function () {
            count--;
            countSpan.innerText = count;

            if (count == 0)
                clearInterval(timerId);
        }, 1000);

    }
});


//================================  s1   ==================================

window.addEventListener("load", function () {
    var addButton = document.getElementById("add-button");
    var xInput = document.getElementById("x-input");
    var yInput = document.getElementById("y-input");
    var resultInput = document.getElementById("result-input");

    addButton.onclick = function () {
        var xValue = xInput.value;
        var yValue = yInput.value;
        var resultValue = parseInt(xValue) + parseInt(yValue);
        resultInput.value = resultValue;
    }
}
);