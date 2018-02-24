const {ccclass, property} = cc._decorator

@ccclass
export default class Star extends cc.Component {
    @property
    pickRadius = 0
    
    game = null

    /* init(game) {
        this.game = game
    } */

    getPlayerDistance() {
        // 根据 player 节点位置判断距离
        let playerPosition = this.game.player.getPosition(),
            dist = cc.pDistance(this.node.position, playerPosition)
        // cc.log(dist)    
        return dist
    }

    onPicked() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar()
        // 加分
        this.game.gainScore()
        // 销毁
        this.node.destroy()
    }

    start () {
        
    }

    update(dt) {
        let dist = this.getPlayerDistance()
        if (dist < this.pickRadius) {
            this.onPicked()
            return
        }
    }
}
