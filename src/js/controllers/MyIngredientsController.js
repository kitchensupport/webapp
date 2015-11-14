function MyIngredientsController($rootScope, $scope, IngredientService) {

    // Require user authentication.
    $rootScope.auth = $rootScope.auth || {};
    $rootScope.auth.required = true;

    $scope.getIngredients = (params = {}) => {
        $scope.ingredients = {status: -1, data: {}};

        IngredientService.getIngredients(params)
            .then((response) => {
                $scope.ingredients = response;
                console.log(response);
            })
            .catch((err) => {
                console.log(`Error getting Ingredients: ${JSON.stringify(err)}`);
            });
        return IngredientService.getIngredients();
    };

    $scope.getPantry = () => {
        $scope.pantry = {status: -1, data: {}};

        IngredientService.getPantry()
            .then((response) => {
                $scope.pantry = response;
                console.log(response);
            })
            .catch((err) => {
                console.log(`Error getting pantry: ${JSON.stringify(err)}`);
            });
    };

    $scope.addPantry = (id) => {
        IngredientService.addPantry(id)
            .then(() => {
                $scope.getPantry();
            })
            .catch((err) => {
                console.log(`Error adding ingredient: ${JSON.stringify(err)}`);
            });
    };

    $scope.removePantry = (id) => {
        IngredientService.removePantry(id)
            .then(() => {
                $scope.getPantry();
            })
            .catch((err) => {
                console.log(`Error removing ingredient: ${JSON.stringify(err)}`);
            });
    };

    $scope.nextPageIngredients = () => {
        console.log($scope.ingredients);
        const limit = +$scope.ingredients.data.params.limit;
        const offset = (+$scope.ingredients.data.params.offset) + limit;
        const params = {limit, offset};

        $scope.getIngredients(params);
    };

    $scope.previousPageIngredients = () => {
        console.log($scope.ingredients);
        const limit = +$scope.ingredients.data.params.limit;
        let offset = (+$scope.ingredients.data.params.offset) - limit;

        if (offset < 0) {
            offset = 0;
        }

        const params = {limit, offset};

        $scope.getIngredients(params);
    };

    // If the user is logged in.
    if ($rootScope.auth.user) {
        $scope.getIngredients();
        $scope.getPantry();
    }
}

export default ['$rootScope', '$scope', 'IngredientService', MyIngredientsController];
