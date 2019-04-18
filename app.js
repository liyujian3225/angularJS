let app = angular.module('myApp',['ui.router'])
    .controller('myCtrl',function($scope){
        $scope.name = 'stephenlee';
        $scope.color = 'black';

        function* helloWorldGenerator() {
            yield 'stephenlee';
            yield '李雨健';
            console.log(666);
            return 'ending';
        }
        let hello = helloWorldGenerator();
        console.log(hello.next());
        console.log(hello.next());
        console.log(hello.next());

    })
    .config(['$stateProvider', function($stateProvider,$urlRouterProvider){

    }])
    .directive('uploadTemplate',function(){
        return {
            scope: {},
            restrict: 'E',
            templateUrl: './directive/upload.html',
            controller: function($scope){
                $scope.name = '上传指令';
                let fileObj = document.querySelector('.upload');
                let fileRead = new FileReader();
                fileObj.onchange=function(){
                    fileRead.readAsDataURL(this.files[0]);
                    fileRead.onload = function(e){
                        let img = document.createElement('<img>').src = e.target.result;
                        fileObj.appendChild(img)
                    }
                }
            }
        }
    })
    .directive('videoBox',function(){
        return {
            priority: 999,  //指令的优先级
            terminal: true, //同一个元素上其它指令的优先级高于本指令，其它指令将停止。
            restrict: 'E',  //指令类型
            replace: true,  //将指令标签替代成template中定义的内容，即页面不会显示video-box标签
            transclude: true,
            templateUrl: './directive/video.html',
            scope: {
                name: '@',  //绑定字符串，继承父scope的属性，使用花括号取值name={{name}}
                print: '&',   //提供一种方式执行一个表达式在父scope的上下文，将父scope的函数绑定在指令的scope中
                color: '=', //建立双向绑定，不需要用花括号：name="name"
            },
            //controller中写业务逻辑，编译之前为呈现视图之前而准备的数据或者暴露一个api给其他服务
            controller: function($scope){
                $scope.value = '提姆队长正在待命！'
            },
            //link中主要操作dom
            link: function(scope,element,attr,controller){
                console.log(scope.color);
                console.log(scope.name);
            }
        }
});