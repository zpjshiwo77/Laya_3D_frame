class Message {
    private static dic: Object = {};
    private static messList: Array<MessageVo> = [];


    /**
     * 清除所有监听
     */
    public static clear(): void {
        this.dic = {};
    }

    /**
     * 添加全局消息监听
     * @param type          消息唯一标识
     * @param listenerObj   侦听函数所属对象(作用域)
     * @param listener      侦听函数
     */
    public static on(type: string, listenerObj: any, listener: Function): void {
        let arr: Array<any> = this.dic[type];
        if (arr == null) {
            arr = new Array<any>();
            this.dic[type] = arr;
        }
        //判断是否存在
        let i: number = 0;
        let len: number = arr.length;
        let obj;
        for (i = 0; i < len; i++) {
            obj = arr[i];
            if (obj[0] == listener && arr[1] == listenerObj) {
                return;
            }
        }
        arr.push([listener, listenerObj]);
    }

    /**
     * 移除全局消息监听
     * @param type          消息唯一标识
     * @param listenerObj   侦听函数所属对象(作用域)
     * @param listener      侦听函数
     */
    public static off(type: string, listenerObj: any, listener: Function): void {
        let arr: Array<any> = this.dic[type];
        if (arr == null) {
            return;
        }

        let i: number = 0;
        let len: number = arr.length;
        let obj;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }

        if (arr.length == 0) {
            this.dic[type] = null;
            delete this.dic[type];
        }
    }

    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    public static offAll(listenerObj: any): void {
        let keys = Object.keys(this.dic);
        let i:number;
        let len:number = keys.length;
        let type, arr;
        let j:number;
        let arrLen:number;
        for (i = 0; i < len; i++) {
            type = keys[i];
            arr = this.dic[type];
            arrLen = arr.length;
            for (j = 0; j < arrLen; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }

            if (arr.length == 0) {
                this.dic[type] = null;
                delete this.dic[type];
            }
        }
    }


    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     *
     */
    public static event(type: string, ...param: any[]): void {
        if (this.dic[type] == null) {
            return;
        }

        let vo:MessageVo = ObjectPool.getItem("MessageVo");
        if(null == vo){
            vo = new MessageVo();
        }
        vo.type = type;
        vo.param = param;
        this.dealMsg(vo);
    }

    /**
     * 处理一条消息
     * @param msgVo
     */
    private static dealMsg(msgVo:MessageVo):void {
        let listeners:Array<any> = this.dic[msgVo.type];
        let i:number = 0;
        let len:number = listeners.length;
        let listener:Array<any> = null;
        while (i < len) {
            listener = listeners[i];
            listener[0].apply(listener[1], msgVo.param);
            if (listeners.length != len) {
                len = listeners.length;
                i--;
            }
            i++;
        }
        msgVo.dispose();
        ObjectPool.recover("MessageVo", msgVo);
    }
}
