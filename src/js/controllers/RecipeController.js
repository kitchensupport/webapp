function RecipeController($scope, $http) {
    $scope.featuredRecipes = {};
    $scope.searchedRecipes = {};

    $scope.getFeaturedRecipes = () => {
        try {
            $http.get('http://localhost:8000/recipe/featured')
                .success((response) => {
                    $scope.featuredRecipes = response.data.matches;
                    return 'SUCCESS';
                })
                .error(() => {
                    return 'FAILURE';
                });
        } catch (err) {
            return 'ERROR';
        }
    };
a
    $scope.getSearchRecipes = (searchTerm) => {
        try {
            $http.get(`http://localhost:8000/recipe/search/${searchTerm}`)
                .success((response) => {
                    $scope.searchedRecipes[searchTerm] = response.data.matches;
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
