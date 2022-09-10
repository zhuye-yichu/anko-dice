
var myClass = {
	randomNum: function(rd){//规定范围随机数
		return Math.floor(Math.random()*(rd)+1)
	},
	randomNum_qz: function(arr_value1,arr_value2,value1_sum){//权重随机数返回
		let mer = 0,i = 0
		// alert(value1_sum+','+arr_value1)
		while(i<value1_sum){	
			i++
			const len = arr_value1.length
			let left = 0, right = len-1,mid = 0
			while(left<right){
				let random = Math.random()*value1_sum
				// alert(value1_sum)	
				mid = Math.floor((left+right)/2)
				if(arr_value1[mid]>=random) right = mid
				else left = mid+1
			}
			mer = left
		}		
		return arr_value2[mer]
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
	}
}

	
Vue.config.productionTip = false 
//阻止vue在启动时生成提示

const vm = new Vue({
    el:'#vm',
    data:function(){
        return{
			Touch_me:[
				{id:0,form:'gitee',link:'链接：'},
				{id:1,form:'B站主页',link:'https://space.bilibili.com/107752126'},
				{id:2,form:'MEW据点',link:'链接：'}
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
			var arr_value1 = [],arr_value2 = []
			var value1_sum = 0 //权重数==后备词数组长度 权重总和
			this.native.forEach(function(item,index){
				arr_value1.push(item.value1)
				value1_sum++
				arr_value2.push(item.value2)
			})
			//进行数据验证
			if(!inputcheck_pub2(this.num2,this.sub2,value1_sum)){
				alert('当选择为不重复时，num 不能大于 数字或备选词 的个数')
				return false
			}
			var flag = true //立个flag，假设真有调皮的孩子将权重输入了0
			arr_value1.forEach(function(item,index){
				if (!inputcheck_pub2_a(item)){
					alert('权重只能为数字，区间建议（0,1000]以内的整数(·ω·)')
					return false
				}
				if(!item){
					flag=false
				}
			})
			if(!flag) {
				alert('权重不能全为零不能为空哦~')
				return false
			}
			//
			let arr = new Array(),tool = 2
			arr = myClass.parfre(tool,this.fre2,this.num2,this.rd2,this.sub2,arr_value1,arr_value2,value1_sum)
			this.resultTool2 = arr	
		}
    }
})

// //创建实例
// const vm = new Vue({
//     el:'#dice',
//     data:function(){
//        return{
//         keyword:'',//搜索关键词
//         DataRole:getdata,//数据内容,数组对象,存放各种候选数据
//         filDataRole:[],//监视属性数据变化暂存
//         preRoleVar:false,//默认人物导航不显示
//         fontColor:['rgb(243 177 35)','rgba(96, 213, 131, 1.0)']
//        }
//     },
//     watch:{
//         keyword:{//监视keyword值s
//             immediate:true,
//             handler(val){
//                 this.filDataRole = this.DataRole.filter((p)=>{
//                 return p.r1.indexOf(val) !== -1
//                 })
//             }
//         }
//     },
//     computed:{//多用于属性使用
//         midData:{//将空内容替换文字
//             get(){
//                 return function(result){
//                     if(result)
//                         return result
//                     else return "(暂无)"
//                 }
//             }
//         },
//         hrefId:{//将id进行加工添加前缀
//             get(){
//                 return function(result){
//                     result = 'role'+result
//                     return result
//                 }
//             }
//         },
//         hrefIduse:{//将href链接进行加工
//             get(){
//                 return function(result){
//                     result = '#' + 'role'+result
//                     return result
//                 }
//             }
//         },
//         zhankORguanb(){//是否显示角色导航
//             return this.preRoleVar?'收拢':'展开'
//         }
//     },
//     methods: {//多用于方法调用
//         showRoleVar(){//改变变量preRoleVar
//             this.preRoleVar = !this.preRoleVar
//         },
//         yinyuDataShow(result){
//             if(result === '淫域梦境' && this.user_id === 0)
//                 return true
//             else false
//         },
//     },
// })
