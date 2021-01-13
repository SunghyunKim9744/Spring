window.addEventListener("load",function() {
    // 전체를 감싸고 있는 섹션 객체 참조
    var section = document.getElementById("section");

    // 주소검색 버튼 참조
    var searchBtn = section.getElementsByClassName("search-button")[0];

    // 자식 창 변수
    var win;

    // 주소검색 클릭시 자식 창 열기
    searchBtn.onclick = function() {
        win = open("sub.html","_blank","width=500px,height=500px");
    }
    
});