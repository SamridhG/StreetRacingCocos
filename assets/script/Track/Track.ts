import { _decorator, CCInteger, Component, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Track')
export class Track extends Component {
    @property({type:Node})TrackNode:Node[]=[];
    TrackHeight:number=null;
    @property({type:CCInteger})
    Speed:number=8;
    ResetPosition:Vec3=null;
    start() {
        this.TrackHeight=this.node.getComponent(UITransform).height;
        this.ResetPosition=this.TrackNode[this.TrackNode.length-1].getPosition();
    }
    // setSpeed(Speed:number){
    //     this.Speed=Speed;
    // }
       trackMovement(){
        for(let index =0;index<this.TrackNode.length;index++){
            let TrackPosition=this.TrackNode[index].getPosition();
            if(TrackPosition.y>-this.TrackHeight)
           { 
            this.TrackNode[index].setPosition(TrackPosition.x,TrackPosition.y-this.Speed);
             }
           else{
               this.TrackNode[index].setPosition(this.ResetPosition.x,this.ResetPosition.y-this.Speed);
               
           }
        }
       }
    update(deltaTime: number) {
        this.trackMovement();
    }
}


