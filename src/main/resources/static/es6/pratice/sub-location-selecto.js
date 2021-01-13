window.addEventListener("load",function(){
    var naver = document.querySelector(".naver-url");
    var urlBtn = document.querySelector(".url-input");
    var urlText = document.querySelector(".text-button");
    var selectBtn = document.querySelector(".img-print");

    // 부모의 h1 객체 참조
    var parentH = parent.document.querySelector("h1");
    
    var currentImg = document.querySelector("img");

    naver.onclick = function() {
        // parent.location.href = "http://www.naver.com";
        parent.location.replace("http://www.naver.com");
    }

    urlBtn.onclick = function() {
        parent.location.href = urlText.value;
        // parent.location.replace(urlText.value);
    }
    
    selectBtn.onclick = function() {
        parentH.innerText = currentImg.src;
    }
});