function RecipeController($scope, RecipeService) {
    $scope.searchedRecipes = {};

    $scope.getSearchRecipes = (searchTerm) => {
        if ($scope.searchedRecipes[searchTerm] && $scope.searchedRecipes[searchTerm].status === 200) {
            return true;
        }

        $scope.searchedRecipes[searchTerm] = {status: -1, data: {}};

        RecipeService.getSearch(searchTerm)
            .then((response) => {
                console.log(response);
                $scope.searchedRecipes[searchTerm] = response;
                return true;
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
