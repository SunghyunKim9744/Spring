window.addEventListener("load",(e)=>{

    const section = document.querySelector("#s1");
    const container = section.querySelector(".container");
    //const box = container.querySelector(".box");
    let curBox = null;
    //let down = false;
    let offset = {x:0,y:0};
    // Element의 위치 값을 알 수 있음. offsetLeft, offsetTop
    let containerOffset = {x:container.offsetLeft, y:container.offsetTop};
    console.log(containerOffset);

    // Scroll의 위치 값
    function getScrollPosition() {
        // window.pageXOffset,window.pageYOffset = > IE
        // document.documentElement.scrollLeft, document.documentElement.scrollTop = > 다른 브라우저
        let x = window.pageXOffset || document.documentElement.scrollLeft;
        let y = window.pageYOffset || document.documentElement.scrollTop;
        return {x,y};
    } 
    // 1. position : relative를 이용하여 컨테이너 위치를 기준으로 보정하고 컨테이너 상대 좌표이용
    // 2. clientX를 이용하여 문서 위치를 기준으로 보정하는 방식.
    section.onmousemove = (e)=>{
        if(!curBox) return;

        let {x:scrollX,y:scrollY} = getScrollPosition();
        curBox.style.left = e.x - containerOffset.x - offset.x+scrollX+"px";
        curBox.style.top = e.y - containerOffset.y - offset.y +scrollY+"px";

        // box.style.left = e.x - containerOffset.x - offset.x+"px";
        // box.style.top = e.y - containerOffset.y - offset.y +"px";

        
        // box.style.left = e.x - offset.x +"px";
        // box.style.top = e.y -offset.y +"px";
        
    }

    section.onmousedown = (e) =>{
        e.preventDefault();
        if(!e.target.classList.contains("box")) return;

        curBox = e.target;
        offset = {x:e.offsetX, y:e.offsetY};

        
        // x,y == client x,y
        // client = > 문서가 기준
        // screen = > 전체 화면이 기준
        // offset = > 이벤트가 들어있는 객체가 기준. 여기선 container
        console.log(`x:${e.x}, y:${e.y}`);
        console.log(`clientX:${e.clientX}, clientY:${e.clientY}`);
        console.log(`screenX:${e.screenX}, screenY:${e.screenY}`);
        console.log(`offsetX:${e.offsetX}, offsetY:${e.offsetY}`);
        console.log(`movementX:${e.movementX}, movementY:${e.movementY}`);

        // box.style.left = e.x - containerOffset.x + "px";
        // box.style.top = e.y - containerOffset.y + "px";

    }

    section.onmouseup = (e) =>{
        curBox = null;
    }

    // box.onmousedown = (e) =>{
       
    //     offset = {x:e.offsetX, y:e.offsetY};
    //     // offset.x = e.offsetX;
    //     // offset.y = e.offsetY;
       
    // }
});