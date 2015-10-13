function LoginController($scope, $http, $state, AuthService) {
    $scope.loginSubmitting = false;

    $scope.login = () => {
        $scope.loginForm = {general: {}, email: {}, password: {}};
        $scope.loginSubmitting = true;

        // Do some simple input validation.
        if (!$scope.account) {
            $scope.loginForm.general['no-input'] = true;
            $scope.loginSubmitting = false;
            return;
        } else if (!$scope.account.password || $scope.account.password.length === 0) {
            $scope.loginForm.password.required = true;
            $scope.loginSubmitting = false;
            return;
        }

        AuthService.login($scope.account.email, $scope.account.password, $scope.account.remember,
          (response) => {
              if (response === 'SUCCESS') {
                  $state.go('home');
              } else if (response === 'FAILURE') {
                  $scope.loginForm.general.incorrect = true;
              } else if (response === 'ERROR') {
                  $scope.loginForm.general.issue = true;
              }
          }
        );

        $scope.loginSubmitting = false;
    };
}

export default ['$scope', '$http', '$state', 'AuthService', LoginController];
