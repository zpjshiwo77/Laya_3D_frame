class iMath {
    public Quality:number;
    public gravity:number;

    constructor(quality:number){
        this.Quality = quality;
        this.gravity = 9.8 * this.Quality;
    }

    /**
	 * 加速度的计算
	 * @param F 力
	 * @param t 作用力的时间
	 */
    public Acceleration(F:number,t:number):number{
        return F / this.Quality * t;
    }

	/**
	 * 矩形碰撞检测
	 * @param source 源对象
	 * @param target 目标对象
	 */
    public static rectHitTest(source:Laya.Sprite,target:Laya.Sprite):any{
        let res = {
			isHit:false,
			hitArea:0
		};
		if(source && target){
			let sX = source.width/2 + target.width/2;
			let sY = source.height/2 + target.height/2;
			let disX = Math.abs(source.x - target.x);
			let disY = Math.abs(source.y - target.y);
			if(disX < sX && disY < sY){
				res.isHit = true;
				res.hitArea = (sX - disX) * (sY - disY);
			} 
		}
		return res;
    }

    /**
	 * 球与矩形碰撞检测
	 * @param source 源对象
	 * @param ball 球对象
	 * @param isCorrect 是否修正位置 
	 */
    public static ballHitTest(source:Laya.Sprite,ball:Laya.Sprite,isCorrect:boolean = false):any{
        let res = {
			x:0,
			y:0,
			hit:false,
			surface:0
		};
		if(source && ball){
			let rotation = - iMath.convertAngle(source.rotation);
			let sourceX = source.x - source.width/2;
			let sourceY = source.y - source.height/2;
			let trfBall = {
				x: Math.cos(rotation) * (ball.x - source.x) - Math.sin(rotation) * (ball.y - source.y) + source.x,
				y: Math.sin(rotation) * (ball.x - source.x) + Math.cos(rotation) * (ball.y - source.y) + source.y
			};
			
			if (trfBall.x < sourceX){
				res.x = sourceX;
				res.surface = 3;
			}
			else if (trfBall.x > sourceX + source.width){
				res.x = sourceX + source.width;
				res.surface = 1;
			}
			else {
				res.x = trfBall.x;
			}

			if (trfBall.y < sourceY) {
                res.y = sourceY;
            } else if (trfBall.y > sourceY + source.height) {
                res.y = sourceY + source.height;
				res.surface = 2;
            } else {
                res.y = trfBall.y;
            }

			let distance = iMath.PointDistance(trfBall.x,trfBall.y,res.x,res.y);
			if(distance < ball.width / 2) {
				res.hit = true;
				if(isCorrect) iMath.CorrectHitPoint(source,ball,res,rotation)
			}
		}
		return res;
    }

    /**
	 * 修正碰撞点
	 * @param source 源对象
	 * @param ball 球对象
	 * @param res 碰撞结果
	 * @param rotation 旋转值 
	 */
    private static CorrectHitPoint(source:Laya.Sprite,ball:Laya.Sprite,res:any,rotation:number):void{
        let trfball = {		//旋转后的球位置修正
			x: res.x,
			y: res.y
		};
		if(res.surface == 0) trfball.y = res.y - ball.width / 2;
		if(res.surface == 1) trfball.x = res.x + ball.width / 2;
		if(res.surface == 2) trfball.y = res.y + ball.width / 2;
		if(res.surface == 3) trfball.x = res.x - ball.width / 2;

		ball.x = Math.cos(-rotation) * (trfball.x - source.x) - Math.sin(-rotation) * (trfball.y - source.y) + source.x;
		ball.y = Math.sin(-rotation) * (trfball.x - source.x) + Math.cos(-rotation) * (trfball.y - source.y) + source.y;
    }

    /**
	 * 深度复制
	 * @param _source 需要复制的对象
	 */
    public static deepClone(_source:any){
        function getClone(_source) {
			let clone = this.dataType(_source) == "array" ? [] : {};
			for(let i in _source) {
				if(this.dataType(_source[i]) != 'object' && this.dataType(_source[i]) != 'array') clone[i] = _source[i];
				else clone[i] = getClone(_source[i]);
			} //end for
			return clone;
		} //edn func
		return getClone(_source);
    }

    /**
	 * 判断数据类型
	 * @param o 
	 */
    public static dataType(o):any{
        if(typeof(o) === 'object') return Array == o.constructor ? 'array' : 'object';
		else return null;
    }

    /**
	 * 获得范围内随机整数
	 * @param min 最小值 
	 * @param max 最大值
	 */
    public static randomRange(min:number,max:number):number{
		let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
    }

    /**
	 * 浮点数的加法
	 * @param a  
	 * @param b 
	 * @param bit 小数点后的位数 默认10000
	 */
    public static FloatPointAdd(a:number,b:number,bit:number = 10000):number{
        return (Math.floor(a * bit) + Math.floor(b * bit)) / bit;
    }

    /**
	 * 角度转弧度
	 * @param deg 
	 */
    public static convertAngle(deg:number):number{
        return Math.PI / 180 * deg;
    }

    /**
	 * 计算两点间距离
	 * @param x1 
	 * @param y1 
	 * @param x2 
	 * @param y2 
	 */
    public static PointDistance(x1:number,y1:number,x2:number,y2:number):number{
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}