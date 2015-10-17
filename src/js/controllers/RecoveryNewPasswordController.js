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

        $http.post('http://api.kitchen.support/accounts/reset/confirm', {
            reset_token: $stateParams.token,
            password: $scope.account.password
        }).then((response) => {
            console.log(`Success Resetting Pasword: '${JSON.stringify(response)}'.`);

            // Redirect to homepage after recovering.
            $state.go('home');
        }).catch((err) => {
            $scope.recoverForm.general.issue = true;
            console.log(`ERROR: '${JSON.stringify(err)}'.`);
        }).finally(() => {
            $scope.recoverSubmitting = false;
        });
    };
}

export default ['$scope', '$http', '$state', '$stateParams', RecoveryNewPasswordController];
