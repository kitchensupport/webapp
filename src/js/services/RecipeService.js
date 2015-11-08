
// Parse an array of recipes.
function parseRecipeArray(promise) {
    return promise.then((response) => {
        if (response && response.status === 200) {
            response.data.recipes.forEach((part, recipe, recipes) => {
                recipes[recipe].url = `recipeView({'recipeId': '${recipes[recipe].yummly_id}'})`;

                if (recipes[recipe].totalTimeInSeconds && recipes[recipe].totalTimeInSeconds > 1) {
                    recipes[recipe].totalTimeString = `${recipes[recipe].totalTimeInSeconds / 60} minutes`;
                }

                recipes[recipe].ratingArray = [];

                // TODO: 'no recipe found' image.
                recipes[recipe].imageUrl = `${recipes[recipe].smallImageUrls[0].split('=')[0]}=s360`;
                for (let i = 0;i < recipes[recipe].rating;i++) {
                    recipes[recipe].ratingArray.push(true);
                }
                for (let i = recipes[recipe].rating;i < 5;i++) {
                    recipes[recipe].ratingArray.push(false);
                }
            });
        }

        return response;
    });
}

// Parse an individual recipe.
function parseRecipe(promise) {
    return promise.then((response) => {
        console.log(response);
        if (response.data.totalTimeInSeconds && response.data.totalTimeInSeconds > 1) {
            response.data.totalTimeString = `${response.data.totalTimeInSeconds / 60} minutes`;
        }
        response.data.ratingArray = [];
        for (let i = 0;i < response.data.rating;i++) {
            response.data.ratingArray.push(true);
        }
        for (let i = response.data.rating;i < 5;i++) {
            response.data.ratingArray.push(false);
        }

        response.data.imageUrl = `${response.data.images[0].hostedLargeUrl.split('=')[0]}=s750`;

        return response;
    });
}

function RecipeService($http, $q, AuthService) {
    return {
        getRecipeStream: () => {
            return parseRecipeArray($http.get(`http://api.kitchen.support/stream`));
        },
        getSearch: (searchTerm) => {
            return parseRecipeArray($http.get(`http://api.kitchen.support/recipes/search/${searchTerm}?forceNew=true`));
        },
        getRecipe: (recipeId) => {
            return parseRecipe($http.get(`http://api.kitchen.support/recipe?yummly_id=${recipeId}`));
        },
        favoriteRecipe: (recipeId) => {
            return $http.post(`http://api.kitchen.support/recipes/favorite`, {api_token: AuthService.getApiToken(), recipe_id: recipeId});
        },
        unFavoriteRecipe: (recipeId) => {
            return $http.delete(`http://api.kitchen.support/recipes/favorite`, {api_token: AuthService.getApiToken(), recipe_id: recipeId});
        },
        likeRecipe: (recipeId) => {
            return $http.post(`http://api.kitchen.support/recipes/likes`, {api_token: AuthService.getApiToken(), recipe_id: recipeId});
        },
        unLikeRecipe: (recipeId) => {
            return $http.delete(`http://api.kitchen.support/recipes/likes`, {api_token: AuthService.getApiToken(), recipe_id: recipeId});
        },
        getLiked: (recipeId) => {
            return parseRecipeArray($http.get(`http://api.kitchen.support/recipes/likes?recipe_id=${recipeId}?api_token=${AuthService.getApiToken()}`));
        }
    };
}
export default ['$http', '$q', 'AuthService', RecipeService];
