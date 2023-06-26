import { _decorator, Component, Node, Sprite, tween } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
import { PlayerInfo } from './PlayerInfo';
const { ccclass, property } = _decorator;

@ccclass('PlayerCar')
export class PlayerCar extends Component {
    @property({type:Node})Car=null;
    @property({type:Node})MiddleNode=null;
    @property({type:Node})LeftNode=null;
    @property({type:Node})RightNode=null;
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
        tween(this.Car).to(1.5,{position:this.MiddleNode.getPosition()}).start();
    }
    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


