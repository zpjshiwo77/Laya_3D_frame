class API{
    private static DominUrl:string = "";

    /**
     * Ajax方法
     * @param method 
     * @param data 
     */
    private static iAjax(method:string,data:any = {}):any{
        data.OpenId = WxStorage.openid;
        if(Laya.Browser.onMiniGame){
            return API.WxAjax(method,data);
        }
        else{
            return new Promise((resolve,reject) => {
                API.normalAjax(method,data)
                .then((res) => {
                    res = eval('(' + res + ')');
                    if(iMath.dataType(res) == "array" || res.errcode == 0) resolve(res);
                    else reject(res);
                })
            })
        }
    }

    /**
     * wx的ajax方法
     * @param method 
     * @param data 
     */
    private static WxAjax(method:string,data:any):any{
        return new Promise((resolve,reject) => {
            resolve();
        })
    }

    /**
     * 普通的ajax方法
     * @param method 
     * @param data 
     */
    private static normalAjax(method:string,data:any):any{
        return new Promise((resolve,reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('post', API.DominUrl + method );
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            let idata = "";
            for (let key in data) {
                idata += key + "=" + data[key] + "&";
            }
            idata = idata.substring(0,idata.length-1);
            xhr.send(idata);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.responseText)
                }
            };
        })
    }

}