function RecipeController($scope, RecipeService) {
    $scope.featuredRecipes = {status: -1, data: {}};
    $scope.searchedRecipes = {};

    $scope.getSearchRecipes = (searchTerm) => {
        $scope.searchedRecipes[searchTerm] = {status: -1, data: {}};

        RecipeService.getSearch(searchTerm)
            .then((response) => {
                $scope.searchedRecipes[searchTerm].status = response.status;
                $scope.searchedRecipes[searchTerm].data = response.data.recipes;
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

