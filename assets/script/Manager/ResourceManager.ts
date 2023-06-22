import { _decorator, Asset, Component, Node, ProgressBar, resources, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResourceManager')
export class ResourceManager {
    private static Instance:ResourceManager=null;
    SpriteFrameArray:SpriteFrame[]=null;
    private ResourceManager(){}
      static  getInstance():ResourceManager{
           if(!ResourceManager.Instance){
            ResourceManager.Instance=new ResourceManager();
           }
           return ResourceManager.Instance
    }
    spriteAssetLoad(path:string,PercentageUpdater:Node){
        console.log("Asset Load Function")
               resources.loadDir(path,SpriteFrame,(finish,total)=>{
                let percentage=finish/total;
                console.log(percentage,"%");
                PercentageUpdater.getComponent(ProgressBar).progress=percentage;
               },(error,asset)=>{
                console.log("Updated Asset",asset);
                          this.SpriteFrameArray=asset;
               })
    }
   
}


