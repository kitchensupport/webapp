function RecipeViewController($scope, $state, $stateParams, RecipeService) {
    $scope.getRecipe = () => {
        const recipeId = $stateParams.recipeId;

        $scope.recipe = {status: -1, data: {}};

        RecipeService.getRecipe(recipeId)
            .then((response) => {
                $scope.recipe.status = response.status;
                $scope.recipe.data = response.data.data;

                return response;
            })
            .catch(() => {
                $scope.recipe.status = 500;
            });
    };

    $scope.favoriteRecipe = () => {
        $scope.recipe.data.favorited = true;

        return RecipeService.favoriteRecipe($scope.recipe.data.id);
    };

    $scope.unFavoriteRecipe = () => {
        $scope.recipe.data.favorited = false;

        return RecipeService.unFavoriteRecipe($scope.recipe.data.id);
    };
}

export default ['$scope', '$state', '$stateParams', 'RecipeService', RecipeViewController];
