import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerInfo')
export class PlayerInfo{
    private static Instance:PlayerInfo=null;
    private PlayerInfo(){}
    static  getInstance():PlayerInfo{
        if(!PlayerInfo.Instance){
         PlayerInfo.Instance=new PlayerInfo();
        }
        return PlayerInfo.Instance
 }
    MyCar:string=null;
   
    setMyCar(MyCarName:string){
      this.MyCar=MyCarName
      console.log("My Car",this.MyCar)
    }
   
}


