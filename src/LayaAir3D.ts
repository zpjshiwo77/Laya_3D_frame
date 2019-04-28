// 程序入口
class LayaAir3D {
    constructor() {
        this.layaInit();
    }

    /**
     * 初始化
     */
    private layaInit():void{
        //初始化微信小游戏
        // Laya.MiniAdpter.init();
        //初始化引擎
        Laya3D.init(750, 1624, true);

        //适配模式
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        // Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;

        //开启统计信息
        // Laya.Stat.show();

        //关闭弹窗掉外框关闭
        UIConfig.closeDialogOnSide = false;

        Laya.loader.create(LoadData.preUIResources,laya.utils.Handler.create(this, this.loadComplate), null);
    }

    /**
     * 预加载素材加载完成
     */
    private preLoadComplate():void{
        Laya.loader.create(LoadData.UIResources,laya.utils.Handler.create(this, this.loadComplate), laya.utils.Handler.create(this, this.loadProgress));
    }

    /**
     * 加载进度
     */
    private loadProgress(progress):void{
        
    }

    /**
     * 素材加载完成
     */
    private loadComplate():void{
        setTimeout(() => {
            let game = new GameMain();
        },100);
    }
}
new LayaAir3D();