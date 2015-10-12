function LoginController($scope, $http) {
    $scope.loginSubmitting = false;

    $scope.login = () => {
        $scope.loginForm = {general: {}, email: {}, password: {}};
        $scope.loginSubmitting = true;

        // Do some simple input validation.
        if (!$scope.account) {
            console.log('no input.');
            $scope.loginForm.general['no-input'] = true;
            $scope.loginSubmitting = false;
            return;
        } else if (!$scope.account.password || $scope.account.password.length === 0) {
            $scope.loginForm.password.required = true;
            $scope.loginSubmitting = false;
            return;
        }

        try {
            $http.post('http://api.kitchen.support/accounts/login',
                {email: $scope.account.email, password: $scope.account.password}
            ).success((response) => {
                console.log(`Success Logging In: '${response}'.`);
            })
            .error((err) => {
                console.log(`ERROR: '${JSON.stringify(err)}'.`);
                $scope.loginForm.general.incorrect = true;
            })
            .finally(() => {
                $scope.loginSubmitting = false;
            });
        } catch (err) {
            console.log(`Error Logging In: '${err}'.`);
            $scope.loginSubmitting = false;
            $scope.loginForm.general.issue = true;
        }
    };
}

export default ['$scope', '$http', LoginController];
