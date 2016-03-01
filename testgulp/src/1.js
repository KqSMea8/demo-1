var animation={};
		//定时器
		animation.interval=null;
		//移动变换x,y方向的偏移量
		animation.x=100;
		animation.y=50;
		//移动步长
		animation.xstep=2;
		animation.ystep=2;
		//圆的半径
		animation.radius=15;
		//填充圆的颜色
		animation.color="red";
		//动画间隔时间(单位毫秒)
		animation.delay=10;
		animation.pause=function(){
			clearInterval(this.interval);
		}
		//更新xy的偏移量
		animation.update=function(width,height){
			//变化xy的值
			this.x+=this.xstep;
			this.y+=this.ystep;
			//检测上的边缘
			//让他停在那，让他步长取反，让他变颜色
			if(this.y<this.radius){
				this.y=this.radius;
				this.ystep=-this.ystep;
				this.color="red";
			}
			//碰到下边缘
			if((this.y+this.radius)>height){
				this.y=height-this.radius;
				this.ystep=-this.ystep;
				this.color="green";
			}
			//碰到左边缘
			if(this.x<this.radius){
				this.x=this.radius;
				this.xstep=-this.xstep;
				this.color="blue";
			}
			//碰到右边缘
			if((this.x+this.radius)>width){
				this.x=width-this.radius;
				this.xstep=-this.xstep;
				this.color="#f90";
			}
			
		}
		//绘制图形
		animation.draw=function(){
			var canvas = document.getElementById("canvas");
			var width = canvas.getAttribute("width");
			var height = canvas.getAttribute("height");
			var context = canvas.getContext("2d");
			//保存画布状态
			context.save();
			//清空绘制
			context.clearRect(0, 0, width, height);
			//更新坐标
			this.update(width,height);
			//填充颜色
			context.fillStyle=this.color;
			//移动坐标
			context.translate(this.x, this.y);
			//重新绘制
			context.beginPath();
			context.arc(0,0,this.radius,0,Math.PI*2,true);
			context.fill();
			//恢复状态
			context.restore();
			
		}
		animation.start=function(){
			//停止动画
			this.pause();
			//开始动画
			this.interval = setInterval("animation.draw()",this.delay);
		}