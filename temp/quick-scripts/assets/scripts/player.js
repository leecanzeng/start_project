(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '40545qGHydE1ZIyrkbkzvp8', 'player', __filename);
// scripts/player.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 2018
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 主角跳跃高度
        _this.jumpHeight = 0;
        // 主角跳跃持续时间
        _this.jumpDuration = 0;
        // 辅助形变动作时间
        _this.squashDuration = 0;
        // 最大移动速度
        _this.maxMoveSpeed = 0;
        // 加速度
        _this.accel = 0;
        // 跳跃音效资源
        _this.jumpAudio = '';
        // 加速度方向开关
        _this.accLeft = false;
        _this.accRight = false;
        // 主角当前水平方向速度
        _this.xSpeed = 0;
        // screen boundaries
        _this.minPosX = 0;
        _this.maxPosX = 0;
        // 初始化跳跃动作
        _this.jumpAction = null;
        return _this;
        // update (dt) {},
    }
    Player.prototype.setJumpAction = function () {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    };
    Player.prototype.start = function () {
        cc.log(555);
        this.node.runAction(this.setJumpAction());
    };
    __decorate([
        property
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "squashDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property
    ], Player.prototype, "accel", void 0);
    __decorate([
        property({
            url: cc.AudioClip
        })
    ], Player.prototype, "jumpAudio", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=player.js.map
        