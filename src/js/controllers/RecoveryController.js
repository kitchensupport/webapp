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

        try {
            $http.get('http://api.kitchen.support/accounts/recover', {
                email: $scope.account.email
            }).success((response) => {
                console.log(`Success requesting recover: '${response}'.`);

                // Hide the form and display 'message sent' div.
                $scope.recoverFormSuccess = true;
            })
            .error((err) => {
                console.log(`ERROR: '${JSON.stringify(err)}'.`);
                $scope.recoverForm.email.invalid = true;
            })
            .finally(() => {
                $scope.recoverSubmitting = false;
            });
        } catch (err) {
            console.log(`Error Logging In: '${err}'.`);
            $scope.recoverSubmitting = false;
            $scope.recoverForm.general.issue = true;
        }
    };
}

export default ['$scope', '$http', RecoveryController];
