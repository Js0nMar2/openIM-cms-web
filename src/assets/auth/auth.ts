export const ADMIN_INFO = "admin-info"
//  存储数据localStorage（数组对象格式）
export function setStorageObj(key:string,obj:any) {
  var str = JSON.stringify(obj);
  return localStorage.setItem(key,str);
}

//获取数据（数组对象格式）
export function getStorageObj(key: string) {
    const adminInfo = localStorage.getItem(key)
    if (typeof adminInfo === 'string' && adminInfo != "") { 
       return JSON.parse(adminInfo);
    }
    return {"token": ""}
}

//清除数据（所有格式）
export function removeStorage(key:string) {
  return localStorage.removeItem(key);
}

//设置cookie
export function setCookie(c_name: any, c_pwd: any, exdays: number) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie =
        "adminID" + "=" + c_name + ";path=/;expires=" + exdate.toUTCString();
    window.document.cookie =
        "secret" + "=" + c_pwd + ";path=/;expires=" + exdate.toUTCString();
}
//读取cookie
export function getCookie(ruleForm: any, remember: any) {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("="); //再次切割
            //判断查找相对应的值
            if (arr2[0] == "adminID") {
                ruleForm.adminID = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == "secret") {
                ruleForm.secret = arr2[1];
            }
        }
    }
    if (ruleForm.adminID != "" && ruleForm.secret != "") {
        remember.value = true
    } else {
        remember.value = false
    }
}
//清除cookie
export function clearCookie() {
    setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
}
