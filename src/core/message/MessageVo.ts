/**
 * MessageVo
 */
class MessageVo{
    public type:string;
    public param:any[];
    public constructor(){

    }

    public dispose():void{
        this.type = null;
        this.param = [];
    }
}