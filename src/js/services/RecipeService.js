function RecipeService($http, $q, AuthService) {
    return {
        featuredRecipes: () => {
            return AuthService.isLoggedIn()
                .then(() => {
                    return $http.get(`http://api.kitchen.support/recipes/featured?api_token=${AuthService.getCurrentUser().api_token}`);
                });
        },
        search: (searchTerm) => {
            return $http.get(`http://api.kitchen.support/recipes/search/${searchTerm}`);
        },
        getRecipe: (recipeId) => {
            return $http.get(`http://api.kitchen.support/recipes/recipe/${recipeId}`);
        },
        favoriteRecipe: (recipeId) => {
            return AuthService.isLoggedIn()
                .then(() => {
                    return $http.post(`http://api.kitchen.support/recipes/favorite`, {id: recipeId});
                });
        },
        unFavoriteRecipe: (recipeId) => {
            return AuthService.isLoggedIn()
                .then(() => {
                    return $http.post(`http://api.kitchen.support/recipes/unfavorite`, {id: recipeId});
                });
        }
    };
}
export default ['$http', '$q', 'AuthService', RecipeService];
