import DragBox from "../modules/DragBox.js";
import ModalBox from "../modules/ModalBox.js";
//import UploadBox from "../modules/UploadBox.js";
import CSS from "../modules/CSS.js";

//  =========== DragBox
window.addEventListener("load",(e)=>{
    
    // 1. 객체를 넘겨주거나
    // let container = document.querySelector("#s1 .container");
    //  let dragBox = new DragBox(container);

    // 2. 객체를 선택하라고 하거나
    let dragBox = new DragBox("#s1 .container");
    
});


// ========== ModalBox
window.addEventListener("load",(e)=>{
    
   let section = document.querySelector("#s2");
   let alertButton = section.querySelector(".alert-button");

   //2-1
   // let modalBox = new ModalBox();

   alertButton.onclick = (e)=>{

   //  let modalBox = new ModalBox();
   //  let time = 0;
   //  setTimeout(() => {
   //      modalBox.alert("he");
   //      console.log(time);
   //  }, 100);
    // modalBox.alert("he");
    //    2
    //    let modalBox = new ModalBox();
    //    alert("hello");
    //    modalBox.alert("he");
    
    // =========== 3 ===========
    // ModalBox.alert("he");

    // 비동기 처리
    let promise = ModalBox.alert("he");
    promise
    .then
    (result=>{
        console.log(`${result}가 눌렸구나`);
    });
       
    // 동기 처리
    (async ()=>{
        let result = await ModalBox.alert("유효하지 않아요");
        console.log(`${result}가 눌렸구나`);
    })();
   }
    
});

//  =========== UploadBox
window.addEventListener("load",(e)=>{
    
    let section = document.querySelector("#s3");
    let dropZone = section.querySelector(".drop-zone");


    dropZone.addEventListener("drop",(e)=>{
        e.preventDefault();
        e.stopPropagation();

        let valid = e.dataTransfer 
                        && e.dataTransfer.types
                        && e.dataTransfer.types.indexOf("Files") >= 0;

        if(!valid)
            ModalBox.alert("파일 형식이 아닙니다");
        cossole.log(e.dataTransfer.files[0].name);
        console.log("drop:" + e.dataTransfer);

        // JS의 데이터를 보내는 방식 FormData - > HTML에서의 form encoding="multiPart"
        let fd = new FormData();
        let url = "/upload";
        fd.append("file",e.dataTransfer.files[0]);
        // Ajax 백단으로 보내기
        let request = new XMLHttpRequest();
        request.addEventListener("load", ()=>{
         
        });
        request.addEventListener("error", ()=>{
           
        });        
        
        request.open("POST", url);
        request.send(fd);    
  
    });

    dropZone.addEventListener("dragover",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        let valid = e.dataTransfer 
                        && e.dataTransfer.types
                        && e.dataTransfer.types.indexOf("Files") >= 0;
        
        let message = valid ? "드롭하세요!" : "유효한 파일이 아닙니다.";

        
        
        dropZone.firstElementChild.innerText = message;        

        console.log("dragover:" + e.dataTransfer);
    });

    dropZone.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        e.stopPropagation();

        CSS.set(dropZone, {
            background:"pink",
            borderRadius:"0px"
        });

        console.log("enter:" + e.dataTransfer);
    });

    dropZone.addEventListener("dragleave",()=>{
        e.preventDefault();
        e.stopPropagation();

        CSS.set(dropZone, {
            background:"#e9e9e9",
            borderRadius:"20px"
        });

        dropZone.firstElementChild.innerText = "업로드할 파일을 드래그 드롭하세요!"; 

        console.log("exit");
    });

    
});