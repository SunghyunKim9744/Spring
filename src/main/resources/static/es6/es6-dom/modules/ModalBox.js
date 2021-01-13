// class ModalBox{
//     #screen;
//     #frame;
//     constructor(){
//         // this.#screen = document.createElement("div");
//         // this.#screen.style.background = "#000";
//         // this.#screen.style.position = "fixed";
//         // this.#screen.style.left = "0px";
//         // this.#screen.style.top = "0px";
//         // this.#screen.style.width = "100%";
//         // this.#screen.style.height = "100%";
//         // this.#screen.style.opacity = "0.6"; 

//         //2.
//         //this.#screen = `<div style="background: #000;position: fixed;left:0px;top:0px;width:100%;height: 100%;opacity: 0.6;"></div>`;
//         //this.#frame = `<div style="background:#fff;position:fixed;left:100px;top:100px;width:500px;height:300px;"></div>`;

//         //2-1.
//         // opacity로 트랜지션 한정하기.
//         let screenHTML = `<div id="screen" style="background: #000;position: fixed;left:0px;top:0px;width:100%;height: 0%;opacity: 0;transition: opacity 5s;"></div>`;   
//         let frameHTML = `<div id="frame" style="background:#fff;position:fixed;left:100px;top:100px;width:500px;height:0px;"></div>`;

//         document.body.insertAdjacentHTML("beforeend", screenHTML);
//         // let tag = document.querySelector("#screen");
//         // console.log(tag.style["transition"]);
//         // console.log(tag.style["opacity"]);

//         // alert(3);
//         this.#screen = document.querySelector("#screen");
//         this.#frame = document.querySelector("#frame");
//         console.log("생성자");

//     }
//     alert(message){
//         console.log("alert");
//         //2-1.
//         // opacity만 트랜지션
//         this.#screen.style.height="100%";
//         this.#screen.style.opacity="0.6";
        
//         // 2.
//         // document.body.insertAdjacentHTML("beforeend", this.#screen);
//         // document.body.insertAdjacentHTML("beforeend", this.#frame);

//         //document.body.append(this.#screen);
//     }
//     confirm(){

//     }    
// }

// export default ModalBox;



// ================== 3 ===================
import CSS from "./CSS.js";
class ModalBox{
    // 1. 객체를 모두 직접 생성했을 때의 장점/단점
    // createElement/appendChild
    // 2. 객체를 모두 문자열로 생성했을 때의
    // innerHTML
    // 3. 객체 생성과 문자열을 조합
    // outer Element만 생성 -> inner는 innerHTML로  
    static alert(message="",title="알림"){
        
        return new Promise((resolve) =>{

        

            // 3. 객체 생성과 문자열을 조합
            // outer Element만 생성 -> inner는 innerHTML로  


            // screen,frame outer Element(div) 생성
            let screen = document.createElement("div");
            let frame = document.createElement("div");
        
            

            //  =========== css 직접 주는 방법
            //screen.style.height="100%";
            //screen.style.opacity="0.6";
            //screen.style.height="100%";
            //screen.style.opacity="0.6";
            //screen.style.height="100%";
            //screen.style.opacity="0.6";
            //screen.style.height="100%";
            //screen.style.opacity="0.6";
            //screen.style.height="100%";
            //screen.style.opacity="0.6";

            //  ========= css 모듈 만들어서 주기
            // CSS.set(screen, {
            //     height:"100%",
            //     opacity:"0.6",
            //     height:"100%",
            //     opacity:"0.6",
            //     height:"100%",
            //     opacity:"0.6",
            //     height:"100%",
            //     opacity:"0.6"
            // });

            // screen,frame CSS설정
            CSS.set(screen, {
                position:"fixed",
                left:"0px",
                top:"0px",
                width:"100%",
                height:"100%",
                background:"#000",
                opacity:"0.0",
                transition: "opacity 1s"
            });

            document.body.append(screen);

            setTimeout(()=>{
                CSS.set(screen, {
                    opacity:"0.6"
                });
            })
            
            screen.addEventListener("transitionend", ()=>{
                CSS.set(frame, {
                    opacity:"1",
                    top:"100px"
                });
            });
            
            CSS.set(frame, {
                position:"fixed",
                top: "50px",
                left:"100px",
                background: "#fff",
                width:"300px",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                opacity:"0",
                transition:"top 1s"                
            });


            // outer + 문자열의 조합
            // frame의 innerHTML
            frame.innerHTML = `
                <div>
                    ${title}
                </div>
                <div style="flex-grow: 1; display:flex;justify-content: center;align-items: center;">
                    ${message}
                </div>
                <div style="display:flex;justify-content: center; border-top: 1px solid #e9e9e9;">
                    <input type="button" value="OK">
                    <input type="button" value="CANCEL">
                </div>
            `;

            
            document.body.append(frame);

            const okButton = frame.querySelector("input[value=OK]");
            const cancelButton = frame.querySelector("input[value=CANCEL]");
            okButton.onclick = ()=>{
                resolve("OK");
                screen.remove();
                frame.remove();
            };
            cancelButton.onclick = ()=>{
                resolve("CANCEL");
                screen.remove();
                frame.remove();
            };

        });

    }
    static confirm(){

    }    
}

export default ModalBox;