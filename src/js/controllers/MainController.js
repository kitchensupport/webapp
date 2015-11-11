function MainController($rootScope, $cookies, AuthService) {
    $rootScope.modals = {};
    $rootScope.auth = {};
    $rootScope.auth.logout = AuthService.logout;

    $rootScope.$on('$stateChangeStart', () => {
        $rootScope.auth.required = false;
    });

    // Check to see if there's a token in storage.
    if (!AuthService.getCurrentUser() && $cookies.ksLoginToken !== undefined && $cookies.ksLoginToken !== 'undefined') {
        AuthService.login({api_token: $cookies.ksLoginToken});
    }

    // Update the scope whenever user information changes.
    $rootScope.$watch(AuthService.getCurrentUser, (user) => {
        $rootScope.auth.user = user;
    });
}

export default ['$rootScope', '$cookies', 'AuthService', MainController];
