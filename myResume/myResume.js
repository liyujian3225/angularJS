angular.module('myResumeModule', ['myResumeRouterModule'])
    .controller('myResumeCtrl',['$scope', 'defaults', function($scope,defaults){
        $scope.defaults = 'myResume';
    }]);
angular.module('myResumeRouterModule', []).config(['$stateProvider',
    function($stateProvider){
        $stateProvider.state('myResume', {
            url: '/myResume',
            views: {
                '': {
                    templateUrl: './myResume/template/myResume.html',
                    controller: 'myResumeCtrl'
                }
            }
        })
    }]);