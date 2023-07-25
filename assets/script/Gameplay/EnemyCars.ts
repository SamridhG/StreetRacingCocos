import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyCars')
export class EnemyCars extends Component {
    @property({type:Prefab})
    EnemyCarPrefab:Prefab=null;
    start() {

    }
  initEnemyCars=()=>{
    
  }
    update(deltaTime: number) {
      
    }
}


