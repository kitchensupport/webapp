function LoginController($scope, $rootScope, $http, $state, $mdDialog, AuthService) {
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
                  if (!$rootScope.modals.loginModalOpen) {
                      $state.go('home');
                  } else {
                      $rootScope.modals.loginModalClose();
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

    // Login modal
    $rootScope.modals.loginModal = ($event) => {
        if (!$rootScope.modals.loginModalOpen) {
            $rootScope.modals.loginModalOpen = true;
            $rootScope.modals.loginModal = $mdDialog.show({
                templateUrl: 'templates/login-modal.html',
                controller: 'LoginController',
                clickOutsideToClose: true,
                targetEvent: $event,
                onRemoving: () => { $rootScope.modals.loginModalOpen = false; }
            });
        }
    };

    $rootScope.modals.loginModalClose = () => {
        if ($rootScope.modals.loginModalOpen) {
            $mdDialog.hide($rootScope.modals.loginModal);
        }
    };
}

export default ['$scope', '$rootScope', '$http', '$state', '$mdDialog', 'AuthService', LoginController];
