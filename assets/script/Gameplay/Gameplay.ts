import { _decorator, Component, Node } from 'cc';
import { PlayerCar } from '../Player/PlayerCar';
import { EnemyCars } from './EnemyCars';
const { ccclass, property } = _decorator;

@ccclass('Gameplay')
export class Gameplay extends Component {
    CarLane:number=0;
    @property({type:Node})CarRoot=null;
    @property({type:Node})EnemeyCar=null;
    TouchStartPosition;
    TouchEndPosition;
    distance=20;
    start() {

    }
registerEvent(){
    console.log("Event Register")
    this.node.on(Node.EventType.TOUCH_MOVE,()=>{},this)
    this.node.on(Node.EventType.TOUCH_CANCEL,this.touchCancel,this)
    this.node.on(Node.EventType.TOUCH_END,this.touchCancel,this)
    this.node.on(Node.EventType.TOUCH_START,this.touchStart,this)
    this.EnemeyCar.getComponent(EnemyCars).initEnemyCars()
}
touchCancel(event){
    this.TouchEndPosition=event.getLocation();
    let angle;
    if(this.TouchEndPosition.x-this.TouchStartPosition.x>this.distance){
          this.CarLane++;
          angle=-30;
          if(this.CarLane>1){
            this.CarLane=1;
            angle=0;
          }
          this.CarRoot.getComponent(PlayerCar).setPositionCar(this.CarLane,angle);
    }else if(this.TouchEndPosition.x-this.TouchStartPosition.x<-this.distance){
        this.CarLane--;
        angle=30;
        if(this.CarLane<-1){
          this.CarLane=-1;
         angle=0;
        }
        this.CarRoot.getComponent(PlayerCar).setPositionCar(this.CarLane,angle);
    }
   
}
touchStart(event){
    this.TouchStartPosition=event.getLocation();
}
    update(deltaTime: number) {
        
    }
}


