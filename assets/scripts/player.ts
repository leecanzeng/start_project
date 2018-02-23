// test
const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // 主角跳跃高度
    @property
    jumpHeight = 0    

    // 主角跳跃持续时间
    @property
    jumpDuration = 0

    // 辅助形变动作时间
    @property
    squashDuration = 0

    // 最大移动速度
    @property
    maxMoveSpeed = 0

    // 加速度
    @property
    accel = 0

    // 跳跃音效资源
    @property({
        url: cc.AudioClip
    })
    jumpAudio = ''

    // 加速度方向开关
    accLeft = false;
    accRight = false;

    // 主角当前水平方向速度
    xSpeed = 0;
    // screen boundaries
    minPosX = 0;
    maxPosX = 0;

    // 初始化跳跃动作
    jumpAction = null;
    
    setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }


    start () {
        cc.log(555);
        this.node.runAction(this.setJumpAction())
        
    }

    // update (dt) {},
}
