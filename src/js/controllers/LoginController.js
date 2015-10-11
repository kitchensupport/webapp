function LogController($scope, $http) {
    $scope.login = () => {
        $http.post('http://api.kitchen.support:8000/login',
            {email: 'example@test.com', password: 'test'}
        ).success((response) => {
            console.log(response);
            $scope.logs = response;
        });
    };
}

export default ['$scope', '$http', LogController];
