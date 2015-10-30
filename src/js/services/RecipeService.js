
// Parse an array of recipes.
function parseRecipeArray(promise) {
    return promise.then((response) => {
        if (response && response.status === 200) {
            response.data.data.matches.forEach((part, recipe, recipes) => {
                recipes[recipe].url = `recipeView({'recipeId': '${recipes[recipe].id}'})`;
                recipes[recipe].url = (recipes[recipe].url);

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
        if (response.data.data.totalTimeInSeconds && response.data.data.totalTimeInSeconds > 1) {
            response.data.data.totalTimeString = `${response.data.data.totalTimeInSeconds / 60} minutes`;
        }
        response.data.data.ratingArray = [];
        for (let i = 0;i < response.data.data.rating;i++) {
            response.data.data.ratingArray.push(true);
        }
        for (let i = response.data.data.rating;i < 5;i++) {
            response.data.data.ratingArray.push(false);
        }

        response.data.data.imageUrl = `${response.data.data.images[0].hostedLargeUrl.split('=')[0]}=s750`;

        return response;
    });
}

function RecipeService($http, $q, AuthService) {
    return {
        getFeaturedRecipes: () => {
            return parseRecipeArray($http.get(`http://api.kitchen.support/recipes/featured?api_token=${AuthService.getApiToken()}`));
        },
        getSearch: (searchTerm) => {
            return parseRecipeArray($http.get(`http://api.kitchen.support/recipes/search/${searchTerm}`));
        },
        getRecipe: (recipeId) => {
            return parseRecipe($http.get(`http://api.kitchen.support/recipes/recipe/${recipeId}`));
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
