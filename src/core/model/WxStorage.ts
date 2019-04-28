class WxStorage{
    public static db: any;
    public static openid: string = "ofWGW5KjCA9L5cWT9toGq-sud0I4";

    /**
     * 初始化
     * @param env 数据库名称
     * @param callback 回调函数
     */
    public static init(env:string,callback:Laya.Handler):void{
        if(Laya.Browser.onMiniGame){
            WxGame.wx.cloud.init({
                env: env,
                traceUser:true
            });
            WxStorage.db = WxGame.wx.cloud.database({
                env: env
            });
            WxGame.wx.cloud.callFunction({
                name: 'getopenid',
                complete: res => {
                    WxStorage.openid = res.result.OPENID;
                    callback.run();
                }
            })
        }
    }

    /**
     * 获取表
     * @param name 表名称
     */
    public static getSheet(name:string):any{
        return WxStorage.db.collection(name);
    }

    /**
     * 添加数据进入表
     * @param sheet 表 
     * @param data 数据
     */
    public static addDataToSheet(sheet:any,data:any):void{
        sheet.add({
            data:data
        }).then(res => {
            console.log("addSocre success:"+res)
        })
    }
}