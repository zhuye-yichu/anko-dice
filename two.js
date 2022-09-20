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
		var _arr_value = arr_value.slice()
		_arr_value = _arr_value.sort(function(){ return Math.random() -0.5})//打乱数组
		let a = Math.floor(Math.random()*value_sum)
		// alert("sum"+value_sum+",a："+a)
		return _arr_value[a]
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
	parnum_qz: function(num,sub,arr_value,value_sum){//权重的单次抽样
		let a = new Array()
		let i = 0,b = 0
		var pd = true
		// alert('num:'+num+'')
		while(i<num){
			i = i+1
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
	//多次抽样列表
	parfre1:function(fre,num,rd,sub,arr_value1,arr_value2,value1_sum){//多次抽样列表
		// alert(fre + ','+num+','+rd)
		let arr =new Array()
		for (let i=0;i<fre;i++){
			arr[i] = 'Fre' + (i+1) + 'Rd' + num + '：' + this.parnum(num,rd,sub)
		}
		return arr
	},
	parfre2:function(fre,num,sub,arr_value,value_sum){//多次抽样列表
		let arr =new Array()
		for (let i=0;i<fre;i++){
			arr[i] = 'Fre' + (i+1) + 'Rd' + num + '：' + this.parnum_qz(num,sub,arr_value,value_sum)
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
