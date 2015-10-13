function RegistrationController($scope, $http, $cookies, $state) {
    $scope.registerSubmitting = false;

    $scope.register = () => {
        $scope.registerForm = {general: {}, email: {}, password: {}, confirm: {}};
        $scope.registerSubmitting = true;

        // Do some simple input validation.
        if (!$scope.account) {
            $scope.registerForm.general['no-input'] = true;
            $scope.registerSubmitting = false;
            return;
        } else if (!$scope.account.password || $scope.account.password.length === 0) {
            $scope.registerForm.password.required = true;
            $scope.registerSubmitting = false;
            return;
        } else if ($scope.account.password !== $scope.account.confirm) {
            $scope.registerForm.confirm.mismatch = true;
            $scope.registerSubmitting = false;
            return;
        }

        try {
            $http.post('http://api.kitchen.support/accounts/create', {
                email: $scope.account.email,
                password: $scope.account.password
            }).success((response) => {
                console.log(`Success Registering: '${JSON.stringify(response)}'.`);

                // Store the new user's token in local storage.
                $cookies.auth = response.user.token;

                $scope.token = response.user.token;

                // Redirect to homepage after registering.
                // TODO: Redirect to email authentication view.
                $state.go('home');
            })
            .error((err) => {
                $scope.registerForm.email.taken = true;
                console.log(`ERROR: '${JSON.stringify(err)}'.`);
            })
            .finally(() => {
                $scope.registerSubmitting = false;
            });
        } catch (err) {
            $scope.registerSubmitting = false;
            $scope.registerForm.general.issue = true;
        }
    };
}

export default ['$scope', '$http', '$cookies', '$state', RegistrationController];
