class Exam{
    #kor;
    #eng;
    #math;

    constructor(kor=0,eng=0,math=0){
        this.#kor = kor;
        this.#eng = eng;
        this.#math = math;
    }
    set kor(value){
        this.#kor = value;
    }
    total(){
        return this.#kor+this.#eng+this.#math;
    }

    avg(){
        return this.total()/3;
    }
}

//export default Exam;

let exam = new Exam(1,2,3);
export default exam;