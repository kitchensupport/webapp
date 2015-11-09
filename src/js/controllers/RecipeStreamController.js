function RecipeStreamController($rootScope, $scope) {

    // Require user authentication.
    $rootScope.auth = $rootScope.auth || {};
    $rootScope.auth.required = true;

    $scope.getStream = () => {
        return true;
    };
}

export default ['$rootScope', '$scope', RecipeStreamController];
