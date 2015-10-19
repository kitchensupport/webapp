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
            () => {
                if (!AuthService.loginModal.isOpen()) {
                    $state.go('home');
                } else {

                    // If we're logging in through the modal, don't redirect.
                    AuthService.loginModal.close();
                }
            },
            () => {
                $scope.loginForm.general.incorrect = true;
            }
          );

        $scope.loginSubmitting = false;
    };

    $scope.openLoginModal = ($event) => {
        AuthService.loginModal.open($event);
    };

    $scope.closeLoginModal = () => {
        AuthService.loginModal.close();
    };
}

export default ['$scope', '$rootScope', '$http', '$state', '$mdDialog', 'AuthService', LoginController];
