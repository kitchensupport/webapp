function RecipeViewController($scope, $state, $stateParams, RecipeService) {
    $scope.getRecipe = () => {
        const recipeId = $stateParams.recipeId;

        $scope.recipe = {status: -1, data: {}};

        RecipeService.getRecipe(recipeId)
            .then((response) => {
                $scope.recipe.status = response.status;
                $scope.recipe.data = response.data;

                return response;
            })
            .catch(() => {
                $scope.recipe.status = 500;
            });
    };

    $scope.favoriteRecipe = () => {
        $scope.recipe.data.favoritedLoading = true;
        RecipeService.favoriteRecipe($scope.recipe.data.id)
            .then(() => {
                $scope.recipe.data.favorited = true;
            })
            .catch((err) => {
                console.log(`Error favoriting recipe: ${JSON.stringify(err)}`);
            })
            .finally(() => {
                $scope.recipe.data.favoritedLoading = false;
            });
    };

    $scope.markCompleted = () => {
        $scope.recipe.data.completedLoading = true;
        RecipeService.completeRecipe($scope.recipe.data.id)
            .then(() => {
                $scope.recipe.data.completed = true;
            })
            .catch((err) => {
                console.log(`Error completing recipe: ${JSON.stringify(err)}`);
            })
            .finally(() => {
                $scope.recipe.data.completedLoading = false;
            });
    };

    $scope.markUnCompleted = () => {
        $scope.recipe.data.completedLoading = true;
        RecipeService.unCompleteRecipe($scope.recipe.data.id)
            .then(() => {
                $scope.recipe.data.completed = false;
            })
            .catch((err) => {
                console.log(`Error un-completed recipe: ${JSON.stringify(err)}`);
            })
            .finally(() => {
                $scope.recipe.data.completedLoading = false;
            });
    };

    $scope.unFavoriteRecipe = () => {
        $scope.recipe.data.favoritedLoading = true;
        RecipeService.unFavoriteRecipe($scope.recipe.data.id)
            .then(() => {
                $scope.recipe.data.favorited = false;
            })
            .catch((err) => {
                console.log(`Error un-favoriting recipe: ${JSON.stringify(err)}`);
            })
            .finally(() => {
                $scope.recipe.data.favoritedLoading = false;
            });
    };
}

export default ['$scope', '$state', '$stateParams', 'RecipeService', RecipeViewController];
