/**
 * 对象池类
 * ObjectPool
 */
class ObjectPool {
   

    /**
     * 构造函数
     */
    public constructor() {
      
    }


    /**
     * 清除缓存对象
     * @params sign {string} 注册时的标识
     */
    public static clearBySign(sign:string):void {
        Laya.Pool.clearBySign(sign);
    }
    /**
     * 根据标识符 返回对象 如果为空 则返回null
     * @params sign {string} 注册时的标识
     */
    public static getItem(sign:string):any{
        return Laya.Pool.getItem(sign);
    }
    /**
     * 将对象放到对应类型标识的对象池中。
     * @params sign {string} 注册时的标识
     * @params item {Object} 类名
     */
    public static recover(sign:string, item:Object):void{
        Laya.Pool.recover(sign, item);
    }

}