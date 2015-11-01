function MyRecipesController($scope) {

    // Require user authentication.
    $scope.auth = $scope.auth || {};
    $scope.auth.required = true;
}

export default ['$scope', MyRecipesController];
