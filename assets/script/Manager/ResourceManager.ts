import { _decorator, Asset, Component, Node, ProgressBar, resources, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResourceManager')
export class ResourceManager {
    private static Instance:ResourceManager=null;
    SpriteFrameArray:SpriteFrame[]=null;
    CarSpriteFrame:SpriteFrame[]=null;
    private ResourceManager(){}
      static  getInstance():ResourceManager{
           if(!ResourceManager.Instance){
            ResourceManager.Instance=new ResourceManager();
           }
           return ResourceManager.Instance
    }
    spriteAssetLoad(path:string,PercentageUpdater:Node,callback){
      
               resources.loadDir(path,SpriteFrame,(finish,total)=>{
                let percentage=(finish/total)/2;
               
                
                PercentageUpdater.getComponent(ProgressBar).progress=percentage;
               },(error,asset)=>{
              
                          this.SpriteFrameArray=asset;
                          callback();
               })
    }
    carAssetLoad(path:string,PercentageUpdater:Node,callback){
       
        let percentage=0;
               resources.loadDir(path,SpriteFrame,(finish,total)=>{
                PercentageUpdater.getComponent(ProgressBar).progress+=((finish/total)/2-percentage);
                percentage=(finish/total)/2;
               
               },(error,asset)=>{
               
                          this.CarSpriteFrame=asset;
                          callback();
               })
    }
}


