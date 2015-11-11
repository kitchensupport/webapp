function MyRecipesController($rootScope, $scope, RecipeService) {

    // Require user authentication.
    $rootScope.auth = $rootScope.auth || {};
    $rootScope.auth.required = true;

    $scope.getLikedRecipes = () => {
        if ($scope.likedRecipes && $scope.likedRecipes.status === 200) {
            return true;
        }

        $scope.likedRecipes = {status: -1, data: {}};

        RecipeService.getLiked()
            .then((response) => {
                $scope.likedRecipes = response;
                return true;
            }, () => {
                $scope.likedRecipes.status = 500;
                return false;
            });
    };
}

export default ['$rootScope', '$scope', 'RecipeService', MyRecipesController];
