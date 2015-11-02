function RecoveryNewPasswordController($scope, $state, $stateParams, AuthService) {
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

        AuthService.forgotPasswordConfirm($stateParams.token, $scope.account.password)
            .then(() => {
                $scope.recoverSubmitting = false;

                // Redirect to homepage after recovering.
                $state.go('home');
            })
            .catch(() => {
                $scope.recoverForm.general.issue = true;
                $scope.recoverSubmitting = false;
            });
    };
}

export default ['$scope', '$state', '$stateParams', 'AuthService', RecoveryNewPasswordController];
