function MainController($rootScope, $cookies, AuthService) {
    $rootScope.modals = {};
    $rootScope.auth = {};
    $rootScope.auth.logout = AuthService.logout;

    // Check to see if there's a token in storage.
    if (!$rootScope.auth.loggedIn && $cookies.ksLoginToken !== undefined && $cookies.ksLoginToken !== 'undefined') {
        AuthService.loginToken($cookies.ksLoginToken);
    }

    // Update the scope whenever user information changes.
    $rootScope.$watch(AuthService.isLoggedIn, (isLoggedIn) => {
        $rootScope.auth.loggedIn = isLoggedIn;
        $rootScope.auth.user = AuthService.currentUser();
    });
}

export default ['$rootScope', '$cookies', 'AuthService', MainController];
