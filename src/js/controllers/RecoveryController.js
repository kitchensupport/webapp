function RecoveryController($scope, $http) {
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

        $http.post('http://api.kitchen.support/accounts/reset/request', {
            email: $scope.account.email
        }).then((response) => {
            console.log(`Success requesting recover: '${response}'.`);

            // Hide the form and display 'message sent' div.
            $scope.recoverFormSuccess = true;
        }).catch((err) => {
            console.log(`ERROR: '${JSON.stringify(err)}'.`);
            $scope.recoverForm.general.issue = true;
        }).finally(() => {
            $scope.recoverSubmitting = false;
        });
    };
}

export default ['$scope', '$http', RecoveryController];
