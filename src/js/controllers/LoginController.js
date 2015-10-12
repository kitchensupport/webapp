function LoginController($scope, $http) {
    $scope.login = () => {
        try {
            $http.post('http://api.kitchen.support/accounts/login/basic',
                {email: $scope.email, password: $scope.password}
            ).success((response) => {
                console.log(`Success Logging In: '${response}'.`);
                $scope.logs = response;
            });
        } catch (err) {
            console.log(`Error Logging In: '${err}'.`);
        }
    };
}

export default ['$scope', '$http', LoginController];
