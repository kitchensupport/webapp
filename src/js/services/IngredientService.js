function parseIngredients(promise) {
    return promise.then((response) => {

        const request = response.config.url.split('?')[1].split('&');

        const params = {};

        request.forEach((param) => {
            const paramData = param.split('=');

            params[paramData[0]] = paramData[1];
        });

        response.data.params = params;
        if (params.offset && params.limit) {
            response.data.range = `${params.offset} - ${+params.offset + +params.limit}`;
        }

        return response;
    });
}

function RecipeService($http, $q, AuthService) {
    return {
        getIngredients: (params = {}) => {

            const {limit = 30, offset = 0} = params;

            return parseIngredients($http.get(`http://api.kitchen.support/ingredients?limit=${limit}&offset=${offset}`));
        },
        getPantry: (params = {}) => {
            console.log(`token: ${AuthService.getApiToken()}`);
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
