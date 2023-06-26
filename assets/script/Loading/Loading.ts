import { _decorator, Component, director, instantiate, Node, PageView, Prefab } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
import { CarView } from '../Car/CarView';
import { PlayerInfo } from '../Player/PlayerInfo';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property({type:Node}) ProgressBar:Node=null;
    @property({type:Node}) CarListBase:Node=null;
    @property({type:Node}) MiniCar:Node=null;
    @property({type:Prefab}) ListCar:Prefab=null;
    @property({type:Node}) ListBase:Node=null;
    ResourceLoad:ResourceManager=null;
    PlayerInfo:PlayerInfo=null;
    start() {
        this.ResourceLoad=ResourceManager.getInstance();
        this.PlayerInfo=PlayerInfo.getInstance();
        this.ResourceLoad.spriteAssetLoad("Texture",this.ProgressBar,()=>{
            this.carAssetLoad()
        });
       director.preloadScene("Gameplay");
    }
    carAssetLoad=()=>{
        this.ResourceLoad.carAssetLoad("Car",this.ProgressBar,()=>{
           this.loaderDisable();
        });
    }
     /**
      * 
      * @description after all resource load
      */
     loaderDisable(){
               // After All resource load
            this.ProgressBar.active=false;
            this.MiniCar.active=false;
            this.CarListBase.active=true;
            this.setCarList();
     }
    setCarList(){
          for(let index=0;index<this.ResourceLoad.CarSpriteFrame.length;index++){
            let Car=instantiate(this.ListCar);
            Car.getComponent(CarView).setSprite(this.ResourceLoad.CarSpriteFrame[index]);
            Car.getComponent(CarView).setLabel(this.ResourceLoad.CarSpriteFrame[index].name);
            this.ListBase.getComponent(PageView).addPage(Car);
          }
    }  
    onClickSelectButton(){
      //  console.log("Car Selected",this.ResourceLoad.CarSpriteFrame[this.ListBase.getComponent(PageView).getCurrentPageIndex()].name);
        this.PlayerInfo.setMyCar(this.ResourceLoad.CarSpriteFrame[this.ListBase.getComponent(PageView).getCurrentPageIndex()].name)
        this.loadScene();
    }

    onClickLeftArrow(){
         let currentindex=this.ListBase.getComponent(PageView).getCurrentPageIndex()-1 
         this.scroll(currentindex);
    }
    onClickRightArrow(){     
         let currentindex=this.ListBase.getComponent(PageView).getCurrentPageIndex()+1 
           this.scroll(currentindex);
    }
    scroll(currentindex){
        this.ListBase.getComponent(PageView).scrollToPage(currentindex,0.3);
    }
    update(deltaTime: number) {
    }
    loadScene(){
        director.loadScene("Gameplay");
    }
}


