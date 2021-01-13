class Omok{
    #x;
    #y;
    #color;
    constructor(x,y){
        this.#x = x;
        this.#y = y;
    }

    get x(){
        return this.#x;
    }

    set x(value){
        this.#x = value;
    }

    get y(){
        return this.#y;
    }

    set y(value){
        this.#y = value;
    }

    get color(){
        return this.#color;
    }

    set color(value){
        this.#color = value;
    }

    total(){
        return this.#x+this.#y;
    }
}

class ExtendsOmok extends Omok{
    #z=3;

    constructor(x,y,z=3){
        super(x,y);
        this.#z = z;
    }
    
    total(){
        return super.total()+this.#z;
    }
}