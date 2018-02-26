const { ccclass, property } = cc._decorator

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    starPrefab: cc.Prefab = null

    @property(cc.Label)
    scoreDisplay: cc.Label = null  
    score:number = 0

    // 星星产生后消失时间的随机范围
    @property
    maxStarDuration: number = 0

    @property
    minStarDuration: number = 0

    // 得分音效
    @property({
        url: cc.AudioClip
    })
    scoreAudio = null  

    // 地面节点，用于确定星星生成的高度
    @property(cc.Node)
    ground: cc.Node = null

    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    @property(cc.Node)
    player: cc.Node = null

    groundY: number = 0

    timer: number = 0

    starDuration: number = 0


    start() {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.height / 2 + this.ground.y
        cc.log(this.groundY)
        this.spawnNewStar()
    }

    // 得分
    gainScore() {
        this.score += 1
        this.scoreDisplay.string = this.score.toString()
        cc.audioEngine.play(this.scoreAudio,false,.5)
    }

    // 生成星星
    spawnNewStar() {
        // 生成新节点
        let newStar = cc.instantiate(this.starPrefab)
        // 插入到canvas
        this.node.addChild(newStar)
        // 设置坐标
        newStar.setPosition(this.getNewStarPosition())
        newStar.getComponent('star').game = this

        // 处置计时器
        this.timer = 0
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration = this.minStarDuration)
    }

    // 生成随机位置
    getNewStarPosition() {
        let randX = 0
        let randY = this.groundY + cc.random0To1() * this.player.getComponent('player').jumpHeight + 50
        randX = cc.randomMinus1To1() * (this.node.width / 2)
        // cc.log(randX, randY)
        return cc.p(randX,randY)
    }

    // gameOver
    gameOver() {
        cc.log('gameOver')
        this.player.stopAllActions()
        // cc.director.loadScene('game')
    }

    update(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver()
            return
        }
        this.timer += dt
    }
}
