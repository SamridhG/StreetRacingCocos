import { _decorator, Component, lerp, Node, Script, Sprite, tween, Vec3 } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
import { PlayerInfo } from './PlayerInfo';
import { Gameplay } from '../Gameplay/Gameplay';
const { ccclass, property } = _decorator;

@ccclass('PlayerCar')
export class PlayerCar extends Component {
    @property({type:Node})Car=null;
    @property({type:Node})MiddleNode=null;
    @property({type:Node})LeftNode=null;
    @property({type:Node})RightNode=null;
    @property({type:Node})Canvas=null;
    ResourceLoad:ResourceManager=null;
    PlayerInfo:PlayerInfo=null;
     onLoad() {
        this.ResourceLoad=ResourceManager.getInstance();
        this.PlayerInfo=PlayerInfo.getInstance();
        this.updateSprite();
        this.carStartPosition()
    }
    updateSprite(){ 
        this.Car.getComponent(Sprite).spriteFrame=this.ResourceLoad.getCar(this.PlayerInfo.MyCar);  
    }
    carStartPosition(){
        tween(this.Car).to(1.5,{position:this.MiddleNode.getPosition()}).call(()=>{
            this.Canvas.getComponent(Gameplay).registerEvent();
        }).start();
    }
    setPositionCar(number){
        switch (number){
            case -1:
                this.setCarPositionLeft();
                break;
            case 0:
                this.setCarPositionMiddle();
                break;
            case 1:
                this.setCarPositionRight();
                break;

        }
    }
    setCarPositionLeft(){
    // this.Car.setPosition(this.LeftNode.getPosition())
    this.Car.angle=30;
    tween(this.Car).to(0.1,{position:this.LeftNode.getPosition()}).call(()=>{ this.Car.angle=0;}).start();
    }
    setCarPositionRight(){
       // this.Car.setPosition(this.RightNode.getPosition())
       this.Car.angle=-30;
        tween(this.Car).to(0.1,{position:this.RightNode.getPosition()}).call(()=>{ this.Car.angle=0;}).start();
    }
    setCarPositionMiddle(){
        tween(this.Car).to(0.1,{position:this.MiddleNode.getPosition()}).start();
       // this.Car.setPosition(this.MiddleNode.getPosition())
    }
    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


