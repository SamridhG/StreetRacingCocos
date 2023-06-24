import { _decorator, Component, instantiate, Node, PageView, Prefab } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
import { CarView } from '../Car/CarView';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property({type:Node}) ProgressBar:Node=null;
    @property({type:Node}) CarListBase:Node=null;
    @property({type:Node}) MiniCar:Node=null;
    @property({type:Prefab}) ListCar:Prefab=null;
    @property({type:Node}) ListBase:Node=null;
    ResourceLoad:ResourceManager=null;
    start() {
        this.ResourceLoad=ResourceManager.getInstance();
        this.ResourceLoad.spriteAssetLoad("Texture",this.ProgressBar,()=>{
            this.carAssetLoad()
        });
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
        console.log("Car Selected",this.ResourceLoad.CarSpriteFrame[this.ListBase.getComponent(PageView).getCurrentPageIndex()].name);
    }
    update(deltaTime: number) {
    }
}


