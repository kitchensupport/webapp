function RecipeViewController($scope, $state, $stateParams, RecipeService) {
    $scope.getRecipe = () => {
        const recipeId = $stateParams.recipeId;

        $scope.recipe = {status: -1, data: {}};

        RecipeService.getRecipe(recipeId)
            .then((response) => {
                $scope.recipe.status = response.status;

                if (response && response.status === 200) {
                    $scope.recipe.data = response.data.data;

                    if ($scope.recipe.data.totalTimeInSeconds && $scope.recipe.data.totalTimeInSeconds > 1) {
                        $scope.recipe.data.totalTimeString = `${$scope.recipe.data.totalTimeInSeconds / 60} minutes`;
                    }
                    $scope.recipe.data.ratingArray = [];
                    for (let i = 0;i < $scope.recipe.data.rating;i++) {
                        $scope.recipe.data.ratingArray.push(true);
                    }
                    for (let i = $scope.recipe.data.rating;i < 5;i++) {
                        $scope.recipe.data.ratingArray.push(false);
                    }
                }
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
