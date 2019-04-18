let app = angular.module('myApp',[
    'ui.router',
    'appRouterModule',
    'loginModule'
]);
angular.module('appRouterModule', []).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/login')
}]);