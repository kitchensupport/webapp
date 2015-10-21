function RecipeController($scope, RecipeService) {
    $scope.featuredRecipes = {status: -1, data: {}};
    $scope.searchedRecipes = {};

    $scope.getFeaturedRecipes = () => {
        RecipeService.featuredRecipes()
            .then((response) => {
                $scope.featuredRecipes.status = response.status;
                if (response && response.status === 200) {
                    $scope.featuredRecipes.data = response.data.data.matches;

                    $scope.featuredRecipes.data.forEach((part, recipe, recipes) => {
                        recipes[recipe].url = `recipeView({'recipeId': '${recipes[recipe].id}'})`;
                        recipes[recipe].totalTimeString = `${recipes[recipe].totalTimeInSeconds / 60} minutes`;
                        recipes[recipe].ratingArray = [];
                        for (let i = 0;i < recipes[recipe].rating;i++) {
                            recipes[recipe].ratingArray.push(true);
                        }
                        for (let i = recipes[recipe].rating;i < 5;i++) {
                            recipes[recipe].ratingArray.push(false);
                        }
                    });

                    return true;
                } else {
                    return false;
                }
            }, () => {
                $scope.featuredRecipes.status = 500;
                return false;
            });
    };

    $scope.getSearchRecipes = (searchTerm) => {
        $scope.searchedRecipes[searchTerm] = {status: -1, data: {}};

        RecipeService.search(searchTerm)
            .then((response) => {
                $scope.searchedRecipes[searchTerm].status = response.status;

                if (response && response.status === 200) {
                    $scope.searchedRecipes[searchTerm].data = response.data.data.matches;

                    $scope.searchedRecipes[searchTerm].data.forEach((part, recipe, recipes) => {
                        recipes[recipe].url = `recipeView({'recipeId': '${recipes[recipe].id}'})`;
                        if (recipes[recipe].totalTimeInSeconds && recipes[recipe].totalTimeInSeconds > 1) {
                            recipes[recipe].totalTimeString = `${recipes[recipe].totalTimeInSeconds / 60} minutes`;
                        }
                        recipes[recipe].ratingArray = [];
                        for (let i = 0;i < recipes[recipe].rating;i++) {
                            recipes[recipe].ratingArray.push(true);
                        }
                        for (let i = recipes[recipe].rating;i < 5;i++) {
                            recipes[recipe].ratingArray.push(false);
                        }
                    });

                    return true;
                } else {
                    return false;
                }
            }, () => {
                $scope.searchedRecipes[searchTerm].status = 500;
                return false;
            });
    };

    $scope.getStars = (numStars) => {
        const stars = [true, true, false];

        for (let i = 0;i < numStars;i++) {
            stars.push(true);
        }
        for (let i = numStars;i < 5;i++) {
            stars.push(false);
        }
        return stars;
    };
}

export default ['$scope', 'RecipeService', RecipeController];
