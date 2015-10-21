function RecipeService($http, $q, AuthService) {
    return {
        getFeaturedRecipes: () => {
            return $http.get(`http://api.kitchen.support/recipes/featured?api_token=${AuthService.getApiToken()}`);
        },
        getSearch: (searchTerm) => {
            return $http.get(`http://api.kitchen.support/recipes/search/${searchTerm}`);
        },
        getRecipe: (recipeId) => {
            return $http.get(`http://api.kitchen.support/recipes/recipe/${recipeId}`);
        },
        favoriteRecipe: (recipeId) => {
            return $http.post(`http://api.kitchen.support/recipes/favorite`, {api_token: AuthService.getApiToken(), id: recipeId});
        },
        unFavoriteRecipe: (recipeId) => {
            return $http.post(`http://api.kitchen.support/recipes/unfavorite`, {api_token: AuthService.getApiToken(), id: recipeId});
        }
    };
}
export default ['$http', '$q', 'AuthService', RecipeService];
