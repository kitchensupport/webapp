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

    $scope.getFavoritedRecipes = () => {
        if ($scope.favoritedRecipes && $scope.favoritedRecipes.status === 200) {
            return true;
        }

        $scope.favoritedRecipes = {status: -1, data: {}};

        RecipeService.getFavorited().then((response) => {
            $scope.favoritedRecipes = response;
            return true;
        }, () => {
            $scope.favoritedRecipes.status = 500;
            return false;
        });
    };

    $scope.getCompletedRecipes = () => {
        if ($scope.completedRecipes && $scope.completedRecipes.status === 200) {
            return true;
        }

        $scope.completedRecipes = {status: -1, data: {}};

        RecipeService.getCompleted().then((response) => {
            $scope.completedRecipes = response;
            return true;
        }, () => {
            $scope.completedRecipes.status = 500;
            return false;
        });
    };
}

export default ['$rootScope', '$scope', 'RecipeService', MyRecipesController];
