function MainController($scope, $cookies, AuthService) {
    $scope.auth = {};
    $scope.auth.logout = AuthService.logout;

    // Check to see if there's a token in storage.
    if (!$scope.auth.loggedIn && $cookies.ksLoginToken !== undefined) {
        AuthService.loginToken($cookies.ksLoginToken);
    }

    // Update the scope whenever user information changes.
    $scope.$watch(AuthService.isLoggedIn, (isLoggedIn) => {
        $scope.auth.loggedIn = isLoggedIn;
        $scope.auth.user = AuthService.currentUser();
    });
}

export default ['$scope', '$cookies', 'AuthService', MainController];
