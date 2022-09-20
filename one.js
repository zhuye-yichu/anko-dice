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
				let arr = new Array()
				arr = myClass.parfre1(this.fre1,this.num1,this.rd1,this.sub1)
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
			//进行遍历取值
			var arr_value=[]			
			this.native.forEach(function(item,index){
				for(var i=0;i<item.value1;i++){
					arr_value.push(item.value2)
				}
			})
			var value_sum = arr_value.length //权重数==后备词数组长度 权重总和
			let arr = new Array()
			arr = myClass.parfre2(this.fre2,this.num2,this.sub2,arr_value,value_sum)
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
