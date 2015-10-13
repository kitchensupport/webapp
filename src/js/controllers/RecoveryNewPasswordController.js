function RecoveryNewPasswordController($scope, $http, $state, $stateParams) {
    $scope.recoverSubmitting = false;
    $scope.recoverTokenValid = true;

    $scope.changePassword = () => {
        $scope.recoverForm = {general: {}, password: {}, confirm: {}};
        $scope.recoverSubmitting = true;

        // Do some simple input validation.
        if (!$scope.account || !$scope.account.password || $scope.account.password.length === 0) {
            $scope.recoverForm.password.required = true;
            $scope.recoverSubmitting = false;
            return;
        } else if ($scope.account.password !== $scope.account.confirm) {
            $scope.recoverForm.confirm.mismatch = true;
            $scope.recoverSubmitting = false;
            return;
        }

        try {

            $http.post('http://api.kitchen.support/accounts/recover', {
                token: $stateParams.token,
                password: $scope.account.password
            }).success((response) => {
                console.log(`Success Resetting Pasword: '${JSON.stringify(response)}'.`);

                // Store the new user's token in local storage.
                // $cookies.auth = response.user.token;

                $scope.token = response.user.token;

                // Redirect to homepage after recovering.
                $state.go('home');
            })
            .error((err) => {
                $scope.recoverForm.general.issue = true;
                console.log(`ERROR: '${JSON.stringify(err)}'.`);
            })
            .finally(() => {
                $scope.recoverSubmitting = false;
            });
        } catch (err) {
            $scope.recoverSubmitting = false;
            $scope.recoverForm.general.issue = true;
        }
    };
}

export default ['$scope', '$http', '$state', '$stateParams', RecoveryNewPasswordController];
