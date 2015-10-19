function RegistrationController($scope, $http, $cookies, $state, AuthService) {
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

        AuthService.register($scope.account.email, $scope.account.password,
            (response) => {

                // Log the user in.
                AuthService.loginToken(response.data.user.api_token,
                  () => {
                      $state.go('home');
                  },
                  (err) => {
                      console.error('Error logging in after registration', err);
                  });
            },
            (err) => {
                $scope.registerForm.email.taken = true;
                console.error('Registration Error', JSON.stringify(err));
                $scope.registerSubmitting = false;
            });
    };
}

export default ['$scope', '$http', '$cookies', '$state', 'AuthService', RegistrationController];
