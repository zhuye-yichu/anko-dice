//将数组对象由权重大小进行排序
// 			---var arr_native = this.native.sort(myClass2.compare("value1"))
//   vue中赋值为引用变量地址，所以被复制的变量重新赋值时会导致原变量发生改变
//   可以通过slice进行第一次深拷贝
// var myClass2 = {//按照数组的某个属性排序
// 	compare:function(property) {
// 	  return function (a, b) {
// 	    var val1 = a[property]
// 	    var val2 = b[property]
// 	    return val1 - val2
// 	  }
// 	}
// }

var myClass = {
	randomNum: function(rd){//规定范围随机数
		return Math.floor(1+Math.random()*rd)
	},
	randomNum_qz: function(arr_value,value_sum){//权重随机数返回
		//输入数组和数组长度，随机返回一个数组内容
		var _arr_value = arr_value.slice()//slice(start,end)-截取拷贝
		_arr_value = _arr_value.sort(function(){ return Math.random() -0.5})//打乱数组
		let a = Math.floor(Math.random()*value_sum)
		// alert("sum"+value_sum+",a："+a)
		return _arr_value[a]
	},
	randomNum_fw: function(min,max){//规定范围随机数
		return Math.floor(min+Math.random()*((max+1)-min))
	},

	// -------------
	// 单次抽样
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
	parnum_qz: function(num,sub,arr_value,value_sum,choose){//权重的单次抽样
		let a = new Array()
		let i = 0,b = 0
		var pd = true
		// alert('num:'+num+'')
		while(i<num){			
			if(sub==="repeat"){
				a[i] = this.randomNum_qz(arr_value,value_sum)
			}
			else{
				pd = true
				f = 0
				while(pd){
					// f++
					// if (f>70) break //防止死循环
					b = this.randomNum_qz(arr_value,value_sum)
					pd = false
					for(var j=0;j<a.length;j++){
						if(b===a[j])
							pd = true
					}
				}
				a[i] = b	
			}
			i = i+1
		}
		if(choose === 2){
			if(a.length!=1){
				a = a.join()//将数组拼接成字符串
			}else{
				a = a[0]
			}			
		}
		return a		
	},
	parnum_fw: function(min,max,num,sub){//范围的单次抽样
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
	//------------------------------
	//多次抽样列表
	parfre1:function(fre,num,rd,sub,arr_value1,arr_value2,value1_sum){//多次抽样列表
		// alert(fre + ','+num+','+rd)
		let arr =new Array()
		for (let i=0;i<fre;i++){
			arr[i] = 'F' + (i+1) + 'N' + num + 'R'+ rd + '：' + this.parnum(num,rd,sub)
		}
		return arr
	},
	parfre2:function(fre,num,sub,arr_value,value_sum){//多次抽样列表
		let arr =new Array()
		for (let i=0;i<fre;i++){
			arr[i] = 'F' + (i+1) + 'N' + num + '：' + this.parnum_qz(num,sub,arr_value,value_sum,2)
		}
		return arr
	},
	parfre3:function(tool,min,max,num,fre,sub){
		let arr =new Array()
		for (let i=0;i<fre;i++){
			arr[i] = 'F' + (i+1) + 'N' + num + '['+min+','+ max  +']' + '：' + this.parnum_fw(min,max,num,sub)
		}
		return arr
	},
	parfre4:function(fre,num,sub,arr_sort){
		let arr = new Array()
		var str1 = "已找到满足条件数据 "+arr_sort.length+" 个，每次独立fre随机返回 "+num+" 个"
		var str2 = "已找到满足条件数据 "+arr_sort.length+" 个，每次独立fre已全部输出 "+arr_sort.length+" 个"
		let back = arr_sort.length>num?str1:str2

		if(arr_sort.length>num || sub==="repeat"){
			//循环遍历，以权重增加对应数组元素数量
			var arr_value=[]
			arr_sort.forEach(function(item,index) {
				for(var i=0;i<parseInt(item.weight);i++){
					arr_value.push(item)
				}
			})
			for (let i = 0; i < fre ; i++){
				var obj = {
					"Fre":i+1,
					"back":back,
					// "result":this.parnum_sort(num,sub,arr_sort)
					"result":this.parnum_qz(num,sub,arr_value,arr_value.length,4)
				}
				arr.push(obj)
			}
		}else{
			var obj = {
				"Fre":1,
				"back":back,
				"result":arr_sort//直接就将整个数组对象返回了
			}
			arr.push(obj)
		}		
		return arr
	}
}
