function AccountController($scope) {

    // Require user authentication.
    $scope.auth = $scope.auth || {};
    $scope.auth.required = true;
}

export default ['$scope', AccountController];
