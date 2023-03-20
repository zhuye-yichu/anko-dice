Vue.config.productionTip = false 
//阻止vue在启动时生成提示

const vm = new Vue({
    el:'#vm',
    data:function(){
        return{
			// Touch_me:[
			// 	{id:0,form:'QQ',name:'2760064344',link:'https://wpa.qq.com/msgrd?v=3&uin=1061401780&site=qq&menu=yes&jumpflag=1'}
			// 	{id:0,form:'bilibili',name:'竹叶梦_亦初',link:'https://space.bilibili.com/107752126'}
			// ],
			filShowTool: false,
			filShowTooltext: '展开功能选项>>',
			toolNumber: 1 ,//工具的序号
			fontColor:['white','black','#484848','#ffcece'],
			bacgroundColor:['white','black','#484848','#ffcece'],
			
			//tool1
			rd1: 6,
			num1: 1,//每一次输出的个数
			fre1: 1,//需要重复的次数
			sub1: 'repeat',//每一次输出的个数是否能重复
			resultTool1:[],//输出的结果
			
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

			//tool4
			sortShow4:[],//这里主要是从表里取得的页名，存的格式为{sort:'页名',choose:false}，同时也是相当于存了一个id
			data4:[],//取得文件后会将它们以json格式存储在这里
			tag4: "",
			num4: 1,
			fre4: 1,
			sub4: 'repeat',
			resultTool4:[],
			
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
		//工具4
		readFile4:function(){//读取文件
			var fileInput = document.getElementById('fileInput');
            var file = fileInput.files[0];
			if(!file){
				alert("请选择读取的文件")
			}
			if(this.sortShow4.length!=0){
				this.sortShow4 = []
				this.data4 = []
			}
            this.readExcelFile(file);
		},
		
		readExcelFile:function(file) {			
			that = this//外部定义,不然后面的回调函数用不了外部数据
			// 创建一个FileReader对象
			var reader = new FileReader();
			// 当读取完成时，触发onload事件
			reader.onload = function(e) {
				// 获取读取的数据
				var data = e.target.result;
				// 将数据解析为workbook对象
				var workbook = XLSX.read(data, {type: 'binary'});
				// 遍历workbook中的每个sheet
				var i = 0;//声明一个i用于记录对象数组位序
				
				workbook.SheetNames.forEach(function(sheetName) {
					var sheetNames = workbook.SheetNames
					var x = i+""
					x = sheetNames[x]
					var obj = {sort:x,choose:false}//i+""转为字符串因为该数据索引页名如果为整数提取的是单个字符
					that.sortShow4.push(obj)
					i++	
					
					// 将sheet转换为行对象数组
					var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
					// 将行对象数组转换为JSON对象
					// var json_object = JSON.stringify(XL_row_object);
					// 给data赋值JSON对象
					that.data4.push(XL_row_object);
					//但是这里获取的数据权重值变成字符串了，需要js弱类型parseInt()强转
				})
			}
			// 当读取出错时，触发onerror事件
			reader.onerror = function(ex) {
				alert(ex)
				console.log(ex)
			};
			// 以二进制方式读取文件
			reader.readAsBinaryString(file)
		},
		modyfySortChoose4:function(num){
			this.sortShow4[num].choose = !this.sortShow4[num].choose
		},
		calResultTool4(){//计算结果
			that = this		
			
				flag = false
				var arr_sort=[]
				this.sortShow4.forEach(function(item,index){
					if(item.choose){
						that.data4[index].forEach(function(item2,index2){
							let b = that.tag4
							if(b.length!=0&&item2.tag!== undefined&&item2.weight!==undefined){
								if(item2.tag.includes(b) && parseInt(item2.weight)>0){
									arr_sort.push(item2)
									flag = true
								}
							}else if(b.length === 0 && item2.weight!==undefined){
								if(parseInt(item2.weight)>0){//因为成为了字符串，所以这里利用js的弱类型强转来判断
									arr_sort.push(item2)
									flag = true
								}
							}
						})
						// arr_sort.push.apply(arr_sort, that.data4[index]);
					}
				})
				if(!flag){
					alert("还没有选择excel页名备选项,或者库中没有满足tag条件且具有权重值的φ(>ω<*) ")
					return
				}
				// console.log(arr_sort)
				arr = myClass.parfre4(this.fre4,this.num4,this.sub4,arr_sort)
				this.resultTool4 = arr
				document.getElementById("result_box4").scrollIntoView()
			
		}
    }
})
