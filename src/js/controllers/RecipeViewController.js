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

                    console.log($scope.recipe.data);

                    return true;
                } else {
                    console.log(`FAIL: ${JSON.stringify(response)}`);
                    return false;
                }
            }, (err) => {
                console.log(`FAIL: ${JSON.stringify(err)}`);
                $scope.recipe.status = 500;
                return false;
            });
    };

    $scope.favoriteRecipe = () => {
        $scope.recipe.data.favorited = true;

        RecipeService.favoriteRecipe($scope.recipe.data.id)
            .then((response) => {
                if (response && response.status === 200) {
                    return true;
                } else {
                    console.log(`FAIL: ${JSON.stringify(response)}`);
                    return false;
                }
            }, (err) => {
                console.log(`FAIL: ${JSON.stringify(err)}`);
                return false;
            });
    };

    $scope.unFavoriteRecipe = () => {
        $scope.recipe.data.favorited = false;

        RecipeService.unFavoriteRecipe($scope.recipe.data.id)
            .then((response) => {
                if (response && response.status === 200) {
                    return true;
                } else {
                    console.log(`FAIL: ${JSON.stringify(response)}`);
                    return false;
                }
            }, (err) => {
                console.log(`FAIL: ${JSON.stringify(err)}`);
                return false;
            });
    };
}

export default ['$scope', '$state', '$stateParams', 'RecipeService', RecipeViewController];
