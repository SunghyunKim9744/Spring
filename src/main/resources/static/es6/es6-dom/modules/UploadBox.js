import CSS from "./CSS.js";
import ModalBox from "./ModalBox.js";
class UploadBox{

    static upload(dropZone){
        dropZone.addEventListener("drop",(e)=>{
            e.preventDefault();
            e.stopPropagation();
    
            let valid = e.dataTransfer 
                            && e.dataTransfer.types
                            && e.dataTransfer.types.indexOf("Files") >= 0;
    
            if(!valid)
                ModalBox.alert("파일 형식이 아닙니다");
            console.log(e.dataTransfer.files[0].name);
            console.log("drop:" + e.dataTransfer);
    
            // JS의 데이터(Binary Data)를 보내는 방식 FormData - > HTML에서의 form encoding="multiPart"
            let fd = new FormData();
            let url = "/upload";
            // 파일(Binary데이터) 추가하기
            fd.append("file",e.dataTransfer.files[0]);
            // 문자열 추가하기
            fd.append("title","제목1");
            // Ajax 백단으로 보내기
            let request = new XMLHttpRequest();
            request.addEventListener("load", (e)=>{
                console.log(e.target.responseText);
                CSS.set(dropZone, {
                    background:"#e9e9e9",
                    borderRadius:"20px"
                });
        
                dropZone.firstElementChild.innerText = "업로드할 파일을 드래그 드롭하세요!"; 
            });
            request.addEventListener("error", (reason)=>{
               console.log(reason);
            });
            // 파일이 로드되는 동안의 상태(upload)를 알기 위한 progress 이벤트 사용
            // Binary Data 담을 때  이벤트 발생 = > 버퍼가 비워질 때마다 발생.
            request.upload.addEventListener("progress",(e)=>{
                // total = > 파일의 총 크기
                // loaded = > 버퍼가 비워질 때(버퍼크기) 
                console.log(`total : ${e.total}, loaded:${e.loaded}`);
    
                // 진행도를 %로
                // e.total : 100 = e.loaded : x
                // dropZone.firstElementChild.innerText= (e.loaded*100)/e.total+"%";
                
    
                // lengthComputable - > 파일의 크기를 알 수 있을때 true 반환
                if(e.lengthComputable)
                // 소수점 자르기(반올림)
                    dropZone.firstElementChild.innerText= Math.round((e.loaded*100)/e.total)+"%";
                else
                    dropZone.firstElementChild.innerText = "파일의 크기를 알 수 없습니다";
            })
            
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
    }
}

export default UploadBox