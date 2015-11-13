function parseIngredients(promise) {
    return promise;
}

function RecipeService($http, $q, AuthService) {
    return {
        getIngredients: (params) => {
            const {limit = 30, offset = 0} = params;

            return parseIngredients($http.get(`http://api.kitchen.support/ingredients?limit=${limit}&offset=${offset}`));
        },
        getPantry: (params) => {
            const {limit = 30, offset = 0} = params;

            return parseIngredients($http.get(`http://api.kitchen.support/pantry?api_token=${AuthService.getApiToken()}&limit=${limit}&offset=${offset}`));
        },
        addPantry: (ingredientId) => {
            return parseIngredients($http.post(`http://api.kitchen.support/pantry?api_token=${AuthService.getApiToken()}&ingredient_id=${ingredientId}`));
        },
        removePantry: (ingredientId) => {
            return parseIngredients($http.delete(`http://api.kitchen.support/pantry?api_token=${AuthService.getApiToken()}&ingredient_id=${ingredientId}`));
        }
    };
}

export default ['$http', '$q', 'AuthService', RecipeService];
