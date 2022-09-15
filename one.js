var myClass2 = {//按照数组的某个属性排序
	compare:function(property) {
	  return function (a, b) {
	    var val1 = a[property]
	    var val2 = b[property]
	    return val1 - val2
	  }
	}
}
var myClass = {
	randomNum: function(rd){//规定范围随机数
		return Math.floor(Math.random()*(rd)+1)
	},
	randomNum_qz: function(arr_value1,arr_value2,value1_sum){//权重随机数返回
		let mer = 0,i = 0
		// alert("value1_sum："+value1_sum+','+"arr_value1："+arr_value1+"max："+max)
		
		// while(i<value1_sum){	
			i++
			let left = 0, right = arr_value1.length-1
			var random = Math.floor(Math.random()*value1_sum)+1
			// alert("random："+random)
			while(left<right){			
				const mid = Math.floor((right - left) / 2) + left;
				// alert("mid："+mid)
				if(arr_value1[mid]<random){
					left = mid+1
				}
				else{
					right = mid
				}
			}
			// alert("left:"+left)
			mer = left
		// }		
		return arr_value2[mer]
	},
	randomNum_fw: function(min,max){//规定范围随机数
		return Math.floor(min+Math.random()*((max+1)-min))
	},
	parnum: function(num,rd,sub){//单次抽样
		let a = new Array()
		let i = 0,b = 0
		var pd = true
		// a[0] = this.randomNum(rd)
		while(i<num){
			i = i+1
			if(sub==="repeat"){
				a[i] = this.randomNum(rd)
			}
			else{
				//这里需要验证一下，num不能大于rd
				pd = true
				while(pd){
					b = this.randomNum(rd)
					pd = false
					for(var j=0;j<=i;j++){
						if(b===a[j])
							pd = true
					}
				}
				a[i] = b	
			}	
		}
		a = a.slice(1).join()
		return a
	},
	parnum_qz: function(num,rd,sub,arr_value1,arr_value2,value1_sum){//权重的单次抽样	
		let a = new Array()
		let i = 0,b = 0
		var pd = true
		// alert('num:'+num+'')
		while(i<num){
			i = i+1
			if(sub==="repeat"){
				a[i] = this.randomNum_qz(arr_value1,arr_value2,value1_sum)
			}
			else{
				pd = true
				while(pd){
					b = this.randomNum_qz(arr_value1,arr_value2,value1_sum)
					pd = false
					for(var j=0;j<=i;j++){
						if(b===a[j])
							pd = true
					}
				}
				a[i] = b	
			}	
		}
		a = a.slice(1).join()
		return a
		
	},
	parnum_fw: function(min,max,num,sub){//单次抽样
		let a = new Array()
		let i = 0,b = 0
		var pd = true
		while(i<num){
			i = i+1
			if(sub==="repeat"){
				a[i] = this.randomNum_fw(min,max)
			}
			else{
				pd = true
				while(pd){
					b = this.randomNum_fw(min,max)
					pd = false
					for(var j=0;j<=i;j++){
						if(b===a[j])
							pd = true
					}
				}
				a[i] = b	
			}	
		}
		a = a.slice(1).join()
		return a
	},
	//多次抽样列表
	parfre:function(tool,fre,num,rd,sub,arr_value1,arr_value2,value1_sum){//多次抽样列表
		// alert(fre + ','+num+','+rd)
		let arr =new Array()
		for (let i=0;i<fre;i++){
			switch(tool){
				case 1:
					arr[i] = 'Fre' + (i+1) + 'Rd' + num + '：' + this.parnum(num,rd,sub)
					break;
				case 2:
					arr[i] = 'Fre' + (i+1) + 'Rd' + num + '：' + this.parnum_qz(num,rd,sub,arr_value1,arr_value2,value1_sum)
					break;
			}
		}
		return arr
	},
	parfre3:function(tool,min,max,num,fre,sub){
		let arr =new Array()
		for (let i=0;i<fre;i++){
			arr[i] = 'Fre' + (i+1) + 'Rd' + num + '：' + this.parnum_fw(min,max,num,sub)
		}
		return arr
	}
}

	
Vue.config.productionTip = false 
//阻止vue在启动时生成提示

const vm = new Vue({
    el:'#vm',
    data:function(){
        return{
			Touch_me:[
				//放到gitee托管时，只保留邮箱
				{id:0,form:'QQ',name:'2760064344',link:'https://wpa.qq.com/msgrd?v=3&uin=1061401780&site=qq&menu=yes&jumpflag=1'}
				// {id:1,form:'gitee',name:'链接',link:''},
				// {id:2,form:'B站主页',name:'链接',link:'https://space.bilibili.com/107752126'},
				// {id:3,form:'MEW据点',name:'链接',link:'链接：'}
			],
			filShowTool: false,
			filShowTooltext: '展开功能选项>>',
			toolNumber: 1 ,//工具的序号
			fontColor:['white','black','#484848'],
			bacgroundColor:['white','black'],
			
			//tool1
			rd1: 6,
			num1: 1,
			fre1: 1,
			sub1: 'repeat',
			resultTool1:[],
			
			//tool2
			addNativeID: 0,//临时id
			native:[
				{id:0,value1:1,value2:''}
			],
			num2: 1,
			fre2: 1,
			sub2: 'repeat',
			resultTool2:[],
			
			//tool3
			rd3min: 0, 
			rd3max: 6,
			num3: 1,
			fre3: 1,
			sub3: 'repeat',
			resultTool3:[],
        }
    },
    watch:{

    },
    computed:{
		ShowTooltext(){//如何显示工具栏展开提示
			return this.filShowTool?'折叠功能选项<<':'展开功能选项>>'
	    }
    },
    methods: {
        showRoleNavtool(number){//改变filShowTool
            if(number)
				this.toolNumber = number
			this.filShowTool = !this.filShowTool
        },
		//工具1
		calResultTool1(){//计算结果
			if(inputcheck_pub1(this.rd1,this.num1,this.fre1,this.sub1)){
				let arr = new Array(),tool=1
				arr = myClass.parfre(tool,this.fre1,this.num1,this.rd1,this.sub1)
				this.resultTool1 = arr	
				document.getElementById("result_box1").scrollIntoView()
			}
		},
		//工具2
		addNative: function(){
			this.addNativeID = this.addNativeID+1
			var add = this.addNativeID
			const input = {id:add,value1:1,value2:''}
			this.native.push(input)
		},
		deleteNative: function(id,value){
			if (!confirm("确定删除 "+value+" 吗？")){
				return false
			}
			this.native = this.native.filter((item) => {
				return item.id !== id
			})
		},
		calResultTool2(){
			//进行数据验证
			if(!inputcheck_pub2(this.num2,this.sub2,this.native.length)){				
				alert('当选择为不重复时，num 不能大于 数字或备选词 的个数')
				return false
			}
			//将数组对象由权重大小进行排序
			var arr_native = this.native.sort(myClass2.compare("value1"))
			//进行遍历取值
			var arr_value1 = [],arr_value2 = []
			var value1_sum = 0 //权重数==后备词数组长度 权重总和
			arr_native.forEach(function(item,index){
				arr_value1.push(item.value1)
				value1_sum = value1_sum+item.value1
				arr_value2.push(item.value2)
			})
			let arr = new Array(),tool = 2
			arr = myClass.parfre(tool,this.fre2,this.num2,this.rd2,this.sub2,arr_value1,arr_value2,value1_sum)
			this.resultTool2 = arr	
			document.getElementById("result_box2").scrollIntoView()
		},
		//工具3
		calResultTool3(){//计算结果
			if(inputcheck_pub3(this.rd3min,this.rd3max,this.num3,this.fre3,this.sub3)){
				let arr = new Array(),tool=3
				arr = myClass.parfre3(tool,this.rd3min,this.rd3max,this.num3,this.fre3,this.sub3)
				this.resultTool3 = arr	
				document.getElementById("result_box3").scrollIntoView()
			}
		},
    }
})