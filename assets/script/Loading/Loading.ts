import { _decorator, Component, Node } from 'cc';
import { ResourceManager } from '../Manager/ResourceManager';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property({type:Node}) ProgressBar:Node=null;
 
    ResourceLoad:ResourceManager=null;
    start() {
        this.ResourceLoad=ResourceManager.getInstance();
        this.ResourceLoad.spriteAssetLoad("Texture",this.ProgressBar,()=>{this.carAssetLoad()});
    }
    carAssetLoad=()=>{
        this.ResourceLoad.carAssetLoad("Car",this.ProgressBar,()=>{});
    }
    update(deltaTime: number) {
        
    }
}


