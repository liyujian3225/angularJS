angular.module('loginModule', ['loginRouterModule'])
    .controller('loginCtrl',['$scope', 'defaults', function($scope,defaults){
        $scope.defaults = defaults;
        console.log($scope.defaults)
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
    }]);
