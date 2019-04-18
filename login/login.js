angular.module('loginModule', ['loginRouterModule'])
    .controller('loginCtrl',['$scope',function($scope){

}]);
angular.module('loginRouterModule', []).config(['$stateProvider',
    function($stateProvider){
        $stateProvider.state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: './login/template/login_tpl.html',
                    controller: 'loginCtrl'
                }
            }
        })
    }])