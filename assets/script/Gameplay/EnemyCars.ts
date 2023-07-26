import { _decorator, Component, instantiate, Node, NodePool, Prefab, Sprite, UITransform } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyCars')
export class EnemyCars extends Component {
    @property({type:Prefab})
    EnemyCarPrefab:Prefab=null;
    @property({type:Node})
    EnemyCarPositions:Node[]=[]
    Init:boolean=false;
    speed=300;
    distance=900;
    InitTime:number=0;
    dt;
    ResourceLoad:ResourceManager=null;
    protected start(): void {
        this.ResourceLoad=ResourceManager.getInstance();
    }
    AddEnemy(){
         let Car=instantiate(this.EnemyCarPrefab);
         let CarRandomPos=Math.floor(Math.random()*3)
         let SpriteIndex=Math.floor(Math.random()*this.ResourceLoad.CarSpriteFrame.length);
         let NodeSpacePosX=this.node.getComponent(UITransform).convertToNodeSpaceAR(this.EnemyCarPositions[CarRandomPos].getWorldPosition());
         let NodeSpacePosY=this.node.getComponent(UITransform).height*0.5+Car.getComponent(UITransform).height;
         Car.setPosition(NodeSpacePosX.x,NodeSpacePosY,0);
         Car.getComponent(Sprite).spriteFrame=this.ResourceLoad.CarSpriteFrame[SpriteIndex];
         this.node.addChild(Car);
         this.InitTime=this.distance/(this.speed*this.dt);
       
    }
  initEnemyCars=()=>{
       this.Init=true;    
  }

    update(deltaTime: number){
     this.dt=deltaTime
      if(this.Init==true && this.InitTime<=0){
           this.AddEnemy();
      }
      this.InitTime--;
      this.node.children.forEach((child)=>{
             let childpos=child.getPosition();
             let NodeSpacePosY=-this.node.getComponent(UITransform).height*0.5-child.getComponent(UITransform).height;
             if(childpos.y<=NodeSpacePosY){
                child.destroy();
             }else{
                childpos.y=childpos.y-(this.speed*deltaTime);
                child.setPosition(childpos);
             }
      })
    }
}


