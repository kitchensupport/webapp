function MainController($rootScope, $localStorage, $sessionStorage, AuthService) {
    $rootScope.modals = {};
    $rootScope.auth = {};
    $rootScope.auth.logout = AuthService.logout;

    $rootScope.$on('$stateChangeStart', () => {
        $rootScope.auth.required = false;
    });

    // Check to see if there's a token in storage somewhere.
    if (!AuthService.getCurrentUser()) {
        if ($localStorage.ksLoginToken !== undefined && $localStorage.ksLoginToken !== 'undefined') {
            AuthService.login({api_token: $localStorage.ksLoginToken});
        } else if ($sessionStorage.ksLoginToken !== undefined && $sessionStorage.ksLoginToken !== 'undefined') {
            AuthService.login({api_token: $sessionStorage.ksLoginToken});
        }
    }

    // Update the scope whenever user information changes.
    $rootScope.$watch(AuthService.getCurrentUser, (user) => {
        $rootScope.auth.user = user;
    });
}

export default ['$rootScope', '$localStorage', '$sessionStorage', 'AuthService', MainController];
