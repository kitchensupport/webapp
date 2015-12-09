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
        getSearch: (params) => {
            const {searchTerm, limit = 28, offset = 0} = params;
            const token = AuthService.getApiToken();

            if (token) {
                return $http.get(`http://api.kitchen.support/ingredients/${searchTerm}?limit=${limit}&offset=${offset}&api_token=${token}`);
            } else {
                return $http.get(`http://api.kitchen.support/ingredients/${searchTerm}?limit=${limit}&offset=${offset}`);
            }
        },
        getIngredients: (params = {}) => {
            const {limit = 30, offset = 0} = params;

            return parseIngredients($http.get(`http://api.kitchen.support/ingredients?limit=${limit}&offset=${offset}`));
        },
        getPantry: (params = {}) => {
            const {limit = 30, offset = 0} = params;

            return parseIngredients($http.get(`http://api.kitchen.support/pantry?api_token=${AuthService.getApiToken()}&limit=${limit}&offset=${offset}`));
        },
        addPantry: (ingredientId) => {
            return $http.post(`http://api.kitchen.support/pantry`, {api_token: AuthService.getApiToken(), ingredient_id: ingredientId});
        },
        removePantry: (ingredientId) => {
            return $http.post(`http://api.kitchen.support/pantry`, {api_token: AuthService.getApiToken(), ingredient_id: ingredientId, value: false});
        }
    };
}

export default ['$http', '$q', 'AuthService', RecipeService];
