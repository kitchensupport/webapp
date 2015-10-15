function RecipeController($scope, $http) {
    $scope.featuredRecipes = {loading: true, data: {}};
    $scope.searchedRecipes = {};

    $scope.getFeaturedRecipes = () => {
        try {
            $http.get('http://api.kitchen.support/recipes/featured')
                .success((response) => {
                    $scope.featuredRecipes.loading = false;
                    $scope.featuredRecipes.data = response.data.matches;
                    return 'SUCCESS';
                })
                .error(() => {
                    return 'FAILURE';
                });
        } catch (err) {
            return 'ERROR';
        }
    };

    $scope.getSearchRecipes = (searchTerm) => {
        $scope.searchedRecipes[searchTerm] = {loading: true, data: {}};
        try {
            $http.get(`http://api.kitchen.support/recipes/search/${searchTerm}`)
                .success((response) => {
                    $scope.searchedRecipes[searchTerm].loading = false;
                    $scope.searchedRecipes[searchTerm].data = response.data.matches;
                    console.log(response.data.matches);
                    return 'SUCCESS';
                })
                .error(() => {
                    return 'FAILURE';
                });
        } catch (err) {
            return 'ERROR';
        }
    };
}

export default ['$scope', '$http', RecipeController];
