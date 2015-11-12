function RecipeStreamController($rootScope, $scope, RecipeService) {

    // Require user authentication.
    $rootScope.auth = $rootScope.auth || {};
    $rootScope.auth.required = true;

    $scope.$watch('recipeStream.currentIndex', () => {
        if ($scope.recipeStream.currentIndex > -1 && $scope.recipeStream.currentIndex < $scope.recipeStream.data.matches) {
            $scope.recipeStream.current = $scope.recipeStream.data.recipes[$scope.recipeStream.currentIndex].id;
        } else {
            $scope.recipeStream.current = -1;
        }
    });

    $scope.getRecipeStream = () => {
        if ($scope.recipeStream && $scope.recipeStream.status === 200) {
            return true;
        }

        $scope.recipeStream = {status: -1, data: {}};
        RecipeService.getRecipeStream()
            .then((response) => {
                console.log(response);
                $scope.recipeStream = response;
                $scope.recipeStream.currentIndex = -1;

                // Trigger a variable change.
                $scope.recipeStream.currentIndex++;
                return true;
            }, () => {
                $scope.recipeStream.status = 500;
                return false;
            });
    };

    $scope.likeRecipe = (id) => {
        RecipeService.likeRecipe(id)
            .then((response) => {
                console.log(`Liked recipe ${id}`);
                console.log(response);
                return true;
            }, (err) => {
                console.log(`Liked recipe ${JSON.stringify(err)}`);
                return false;
            });
        $scope.recipeStream.currentIndex++;
    };

    $scope.dislikeRecipe = (id) => {
        console.log(id);
        $scope.recipeStream.currentIndex++;
    };
}

export default ['$rootScope', '$scope', 'RecipeService', RecipeStreamController];
