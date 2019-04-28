class Log {
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    public static echo(...optionalParams:any[]):void {
        console.log.apply(console, optionalParams);
    }
    public static warn(...optionalParams:any[]):void {
        console.warn.apply(console, optionalParams);
    }
}