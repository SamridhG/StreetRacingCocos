import { _decorator, Component, Node } from 'cc';
import { PlayerCar } from '../Player/PlayerCar';
const { ccclass, property } = _decorator;

@ccclass('Gameplay')
export class Gameplay extends Component {
    CarLane:number=0;
    @property({type:Node})CarRoot=null;
    TouchStartPosition;
    TouchEndPosition;
    start() {

    }
registerEvent(){
    console.log("Event Register")
    this.node.on(Node.EventType.TOUCH_MOVE,()=>{

    },this)
    this.node.on(Node.EventType.TOUCH_CANCEL,this.touchCancel,this)
    this.node.on(Node.EventType.TOUCH_END,this.touchCancel,this)
    this.node.on(Node.EventType.TOUCH_START,this.touchStart,this)
}
touchCancel(event){
    this.TouchEndPosition=event.getLocation();
    let angle;
    if(this.TouchEndPosition.x-this.TouchStartPosition.x>0){
          this.CarLane++;
          angle=-30;
          if(this.CarLane>1){
            this.CarLane=1;
            angle=0;
          }
         
    }else if(this.TouchEndPosition.x-this.TouchStartPosition.x<0){
        this.CarLane--;
        angle=30;
        if(this.CarLane<-1){
          this.CarLane=-1;
         angle=0;
        }
    }
    this.CarRoot.getComponent(PlayerCar).setPositionCar(this.CarLane,angle);
}
touchStart(event){
    this.TouchStartPosition=event.getLocation();
}
    update(deltaTime: number) {
        
    }
}


