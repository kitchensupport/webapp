function AuthController($scope, $cookieStore) {
    $scope.token = $cookieStore.get('token');
}

export default ['$scope', '$cookieStore', AuthController];
