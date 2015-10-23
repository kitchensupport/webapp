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

        AuthService.login({email: $scope.account.email, password: $scope.account.password, remember: $scope.account.remember})
            .then(() => {
                if (!AuthService.loginModal.isOpen()) {
                    $state.go('home');
                } else {

                    // If we're logging in through the modal, don't redirect.
                    AuthService.loginModal.close();
                }
            })
            .catch(() => {
                $scope.loginForm.general.incorrect = true;
            })
            .finally(() => {
                $scope.loginSubmitting = false;
            });
    };

    $scope.openLoginModal = ($event) => {
        AuthService.loginModal.open($event);
    };

    $scope.closeLoginModal = () => {
        AuthService.loginModal.close();
    };
}

export default ['$scope', '$rootScope', '$http', '$state', '$mdDialog', 'AuthService', LoginController];
