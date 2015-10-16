function RecipeController($scope, $http) {
    $scope.featuredRecipes = {status: -1, data: {}};
    $scope.searchedRecipes = {};

    $scope.getFeaturedRecipes = () => {
        $http.get('http://api.kitchen.support/recipes/featured')
            .then((response) => {
                console.log(JSON.stringify(response));
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
                    console.log(`FAIL: ${JSON.stringify(response)}`);
                    return false;
                }
            }, (err) => {
                console.log(`FAIL: ${JSON.stringify(err)}`);
                $scope.featuredRecipes.status = 500;
                return false;
            });
    };

    $scope.getSearchRecipes = (searchTerm) => {
        $scope.searchedRecipes[searchTerm] = {status: -1, data: {}};

        $http.get(`http://api.kitchen.support/recipes/search/${searchTerm}`)
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


                    console.log($scope.searchedRecipes[searchTerm].data);

                    return true;
                } else {
                    console.log(`FAILb: ${JSON.stringify(response)}`);
                    return false;
                }
            }, (err) => {
                console.log(`FAILa: ${JSON.stringify(err)}`);
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

export default ['$scope', '$http', RecipeController];
