function LogController($scope, $http) {
    $scope.getLogs = () => {
        $http.get('http://api.kitchen.support:8000')
        .success((response) => {
            $scope.logs = response;
        });
    };
}

export default ['$scope', '$http', LogController];
