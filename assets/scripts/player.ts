const { ccclass, property } = cc._decorator

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
    jumpAudio = null

    // 加速度方向开关
    accLeft = false
    accRight = false

    // 主角当前水平方向速度
    xSpeed = 0

    // screen boundaries
    minPosX = 0
    maxPosX = 0

    // 初始化跳跃动作
    jumpAction = null

    playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.play(this.jumpAudio,false,.5)
    }

    setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut())
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn())
        // 形变
        var squash = cc.scaleTo(this.squashDuration, 1, 0.6)
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.2)
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1)
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this)
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(squash, stretch, jumpUp, scaleBack, jumpDown, callback))
    }

    setInputControl() {
        let canvas = this.node.parent

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            let keyCode = event.keyCode
            switch (keyCode) {
                case cc.KEY.a:
                case cc.KEY.left:
                    this.accLeft = true
                    this.accRight = false
                    break
                case cc.KEY.d:
                case cc.KEY.right:
                    this.accLeft = false
                    this.accRight = true
                    break
            }
        })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            let keyCode = event.keyCode
            switch (keyCode) {
                case cc.KEY.a:
                case cc.KEY.left:
                    this.accLeft = false
                    break
                case cc.KEY.d:
                case cc.KEY.right:
                    this.accRight = false
                    break
            }
        })

        // touch input
        canvas.on(cc.Node.EventType.TOUCH_START, (event) => {
            let touch = event.touch
            var touchLoc = touch.getLocation()
            if (touchLoc.x >= cc.winSize.width / 2) {
                this.accLeft = false
                this.accRight = true
            } else {
                this.accLeft = true
                this.accRight = false
            }
        })

        canvas.on(cc.Node.EventType.TOUCH_END, function(event) { 
            console.log('touch end')
            this.accLeft = false
            this.accRight = false
        })
    }

    start() {
        
        this.jumpAction = this.setJumpAction()
        this.node.runAction(this.jumpAction)
        this.setInputControl()
        
    }

    update(dt) {
        // 根据当前加速度方向每帧更新速度
        // cc.log(dt)
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt

        // limit player position inside screen
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2
            this.xSpeed = 0
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2
            this.xSpeed = 0
        }
    }
}
