class BaseDialog{
    public view:any;
    protected onClose:Laya.Handler = null;

    constructor(){

    }

    /**
     * 显示
     */
    public show():void{
        this.view.popup();
    }

    

    /**
     * 隐藏
     */
    public hide():void{
        this.view.close();
        if(this.onClose) this.onClose.run();
    }
}