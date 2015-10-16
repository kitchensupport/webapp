function RecipeViewController($scope, $http, $state, $stateParams) {
    $scope.getRecipe = () => {
        const recipeId = $stateParams.recipeId;

        $scope.recipe = {status: -1, data: {}};

        $http.get(`http://api.kitchen.support/recipes/recipe/${recipeId}`)
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
                    console.log(`FAILb: ${JSON.stringify(response)}`);
                    return false;
                }
            }, (err) => {
                console.log(`FAILa: ${JSON.stringify(err)}`);
                $scope.recipe.status = 500;
                return false;
            });
    };
}

export default ['$scope', '$http', '$state', '$stateParams', RecipeViewController];
