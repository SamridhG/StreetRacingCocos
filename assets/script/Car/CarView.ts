import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CarView')
export class CarView extends Component {
    @property({type:Node}) Car:Node=null;
    @property({type:Label})CarName:Label=null;
    start() {

    }
    myInfo(){
        return this;
    }
   setSprite(spriteframe:SpriteFrame){
    this.Car.getComponent(Sprite).spriteFrame=spriteframe;
   }
   setLabel(Name:string){
    this.CarName.string=Name;
   }
    update(deltaTime: number) {
        
    }
}


