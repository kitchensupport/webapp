function LoginController($scope, $rootScope, $http, $state, $mdDialog, AuthService, AuthModalService) {
    $scope.loginSubmitting = false;

    $scope.login = () => {
        $scope.loginSubmitting = true;
        $scope.loginForm = {general: {}, email: {}, password: {}};

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

                  // If we're logging in through the modal, don't redirect.
                  if (!AuthModalService.isOpen()) {
                      $state.go('home');
                  } else {
                      AuthModalService.close();
                  }

              } else if (response === 'FAILURE') {
                  $scope.loginForm.general.incorrect = true;
              } else if (response === 'ERROR') {
                  $scope.loginForm.general.issue = true;
              }

              $scope.loginSubmitting = false;
          }
        );
    };

    $scope.openLoginModal = ($event) => {
        AuthModalService.open($event);
    };

    $scope.closeLoginModal = () => {
        AuthModalService.close();
    };
}

export default ['$scope', '$rootScope', '$http', '$state', '$mdDialog', 'AuthService', 'AuthModalService', LoginController];
