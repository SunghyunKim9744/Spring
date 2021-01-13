function func(id,callback){

    let ids = id +5;

    console.log("get 함수 호출 전");
    setTimeout(function(){
        callback(ids);
    },3000);
    
    console.log("get 함수 호출 후");
}

let id = 10;

let idValue = 0;

idValue = func(id,function(ids){
    console.log(ids);
})
console.log("메인 영역");

//5 15 7 17

// 5 18 10 20