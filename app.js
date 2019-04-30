//手动启动angular
angular.element(document).ready(function(){
    angular.bootstrap(document, ['myApp'])
});

let app = angular.module('myApp',[
    'ui.router',
    'validation',
    'validation.rule',
    'appRouterModule',
    'loginModule',
    'myResumeModule'
]).constant('defaults',{
    //当我们想要创建一个服务时，并且这个服务只需要返回数据时，就可以用constant(name,value)和value(name,value)
    //value不可以在config里注入，但是constant可以
    //value可以修改，但是constant不可以修改，一般用constant配置一些需要常用的数据
    master: 'StephenLee',
    telephone: 18734804473,
}).run(['$rootScope', '$location',function($rootScope,$location,){
            //angular run()运行块在注入器创建之后被执行，它是所有angular应用第一个被执行的方法，
            // 通常来注册全局的事件监听器(浏览器判断、登录判断、白名单判断、设置公共参数)
            $rootScope.year = '2019'
}]).config(['$validationProvider', function($validationProvider){
    // 验证规则
    let expression = {
        ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        sensitiveWords: function(value) {
            let flag = true;
            angular.forEach(value.split("\n"), function(data, index, array) {
                let reg = /^([a-zA-Z0-9\u4e00-\u9fa5]{1,50}),([^,< > / \ ' "]{0,50}),([12]{0,1})$|^([a-zA-Z0-9\u4e00-\u9fa5]{1,50}),([^,< > / \ ' "]{0,50})$|^([a-zA-Z0-9\u4e00-\u9fa5]{1,50}),([^,< > / \ ' "]{0,50}),$|^([a-zA-Z0-9\u4e00-\u9fa5]{1,50})$/;
                data.match(reg) ? "" : flag = false;
            });
            return flag;
        },
        userName: function(value) {
            let flag = true;
            if (value == 'admin' || value == 'system') {
                flag = false;
            }
            return flag;
        },
        userNameChar: /^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9_.\-]+$/,
        /*sperChnlIds: /^((([0-9]+,)*[0-9]+)|([0-9]*))$/,*/
        sperChnlIds: function(value) {
            if (!value) return true;
            let sperChnlIds_REGEXP = /^((([0-9]+,)*[0-9]+)|([0-9]*))$/;
            return sperChnlIds_REGEXP.test(value);
        },
        uniqueTime: function(value) {
            return value.length < 5;
        },
        posInt: function(value) {
            if (!value) return true;
            let posInt_REGEXP = /^[1-9][0-9]*$/;
            return posInt_REGEXP.test(value);
        },
        decimalNumber: function(value) {
            if (!value) return true;
            let decimalNumber_REGEXP = /^(?:(?:[1-9][0-9]*(?:\.[0-9]*[1-9])?)|(?:0(?:\.[0-9]*[1-9])?))$/;
            return decimalNumber_REGEXP.test(value);
        },
        maxindex: function(value, scope, element, attrs, param) {
            if (!value) return true;
            return parseInt(value) <= param;
        },
        minindex: function(value, scope, element, attrs, param) {
            if (!value) return true;
            return parseInt(value) >= param;
        },
        maxwordlength: function(value, scope, element, attrs, param) {
            if (!value) return true;
            let newVal = value.replace(/\<\/?[A-Za-z]+(.*?)\>/g, "");
            let len = 0;
            for (let i = 0; i < newVal.length; i++) {
                let data = newVal[i];
                if (data.match(/[\u0000-\u00ff]/g)) len += 0.5;
                else if (data.match(/[\u4e00-\u9fa5]|[！￥……（）——【】：“‘？《》？、·。，]/g)) len++;
                else if (data.match(/[\uff00-\uffff]/g)) len++;
                else if (data.match(/ /g)) len += 0.5;
                else if (data.match(/　/g)) len++;
            }
            return len <= param;
        },
        iframe: function(value) {
            if (!value) return true;
            let iframe_REGEXP = /^<(iframe|IFRAME)[^>]*src=(?:"[^"]+"|'[^']+')[^>]*><\/(iframe|IFRAME)>$/;
            return iframe_REGEXP.test(value);
        },
        spechar2:function(value) {
            if(!value)return true;
            let SPEACHAR_REGEXP = /[<>]/;
            return !SPEACHAR_REGEXP.test(value);
        }
    };
    // 验证提示
    let validMsg = {
        ip: {
            error: 'IP格式不正确',
            success: ''
        },
        sensitiveWords: {
            error: '敏感词格式错误',
            success: ''
        },
        userName: {
            error: "用户名不能使用系统保留账号",
            success: ""
        },
        userNameChar: {
            error: "不符合用户名填写规则",
            success: ""
        },
        sperChnlIds: {
            error: "不符合填写规则",
            success: ""
        },
        uniqueTime: {
            error: "排重时间不能大于5位数",
            success: ""
        },
        posInt: {
            error: '只能填写正整数！',
            success: ''
        },
        maxindex: {
            error: "超过最大序号数",
            success: ""
        },
        minindex: {
            error: "小于最小序号数",
            success: ""
        },
        maxwordlength: {
            error: "长度不能超过50个字符",
            success: ""
        },
        decimalNumber: {
            error: "只能填写正数",
            success: ""
        },
        iframe: {
            error: "只能填写iframe代码",
            success: ""
        },
        spechar2:{
            error: "不能包含特殊字符",
            success: ""
        }
    };
    $validationProvider.setExpression(expression) // set expression
        .setDefaultMsg(validMsg); // set valid message

}]);
angular.module('appRouterModule', []).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/myResume')
}]);

