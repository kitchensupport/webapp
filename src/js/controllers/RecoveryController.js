function RecoveryController($scope, AuthService) {
    $scope.recoverSubmitting = false;
    $scope.recoverFormSuccess = false;

    $scope.sendRecoveryToken = () => {
        $scope.recoverForm = {general: {}, email: {}};
        $scope.recoverSubmitting = true;

        // Do some simple input validation.
        if (!$scope.account) {
            $scope.recoverForm.email.required = true;
            $scope.recoverSubmitting = false;
            return;
        }

        AuthService.forgotPassword($scope.account.email)
            .then(() => {
                $scope.recoverFormSuccess = true;
                $scope.recoverSubmitting = false;
            })
            .catch(() => {
                $scope.recoverForm.general.issue = true;
                $scope.recoverSubmitting = false;
            });
    };
}

export default ['$scope', 'AuthService', RecoveryController];
