function MyIngredientsController($rootScope, $scope, IngredientService) {

    // Require user authentication.
    $rootScope.auth = $rootScope.auth || {};
    $rootScope.auth.required = true;

    $scope.getIngredients = () => {
        return IngredientService.getIngredients();
    };

    $scope.getPantry = () => {
        return IngredientService.getPantry();
    };

    $scope.addIngredient = (id) => {
        return IngredientService.addPantry(id);
    };

    $scope.removeIngredient = (id) => {
        return IngredientService.removePantry(id);
    };
}

export default ['$rootScope', '$scope', 'IngredientService', MyIngredientsController];
