function inputcheck_pub1(rd,num,fre,sub){
	let c = /^\+?[1-9][0-9]*$/
	if(c.test(rd)&&c.test(num)&&c.test(fre)){
		if (rd<2||rd>1000){
			alert('未通过：rd 不建议小于2或大于1000 (*´・ｖ・)')
			return false
		}
		if (num>50||fre>50){
			alert('未通过：num 和 fre 建议 50 以下')
			return false
		}
		if ((sub!=="repeat")&&(num>rd)){
			alert('未通过：单次抽样结果选择不重复时 num 不能大于等于 rd ..Σ( ° △ °|||)')
			return false
		}	
		return true	
	}
	else {
		alert('未通过：输入内容只能是 正整数 哦(>-<)')		
		return false
	}
}
function inputcheck_pub2(num,sub,value1_sum){
	if ((sub!=="repeat")&&(num>value1_sum)){
		return false
	}
	else return true
}
function inputcheck_pub2_a(n){
	let c =  /^\+?[0-9]*$/
	if (c.test(n)&&n<=1000&&n>0){
		return true
	}
	else return false
}


//判断两个数组的不同元素
						// if(i===num){
						// 	alert(a)
						// 	for (var k=0;k<=i;k++){
						// 		if (exist(arr[k],a))
						// 			b=arr[k]
						// 	}
						// 	break
						// }
function exist(num, arr) {
	// alert(arr)
	for (var j = 0; j < arr.length; j++) {
	    if (num === arr[j]) {
	        return false; //如果传过来的元素在arr中能找到相匹配的元素，我们返回fasle
	    }
	}
	return true; //如果不能找到相匹配的元素，返回true
}