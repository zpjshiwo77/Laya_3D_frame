class BaseView {
    public view:any;
    public pageHeight:number;
    public pageWidth:number; 

    constructor(){

    }

    /**
     * 添加到舞台
     */
    protected AddToStage():void{
        Laya.stage.addChild(this.view);
    }

    /**
     * 计算距离页面的高度
     * @param sp 精灵对象
     * @param pos 距离顶部的位置 1 置底 2 居中
     */
    public countSpTopDis(sp:Laya.Sprite,pos:number):void{
        sp.y = ((750 / Laya.Browser.clientWidth) * Laya.Browser.clientHeight - sp.height) / pos;
    }
}