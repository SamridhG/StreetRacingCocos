import { _decorator, Component, Node } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property({type:Node}) ProgressBar:Node=null;
    @property({type:Node}) CarListBase:Node=null;
    @property({type:Node}) MiniCar:Node=null;
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
     }

    update(deltaTime: number) {
        
    }
}


