import debounce from 'lodash.debounce';

function MyIngredientsController($rootScope, $scope, IngredientService) {

    // Require user authentication.
    $rootScope.auth = $rootScope.auth || {};
    $rootScope.auth.required = true;

    const ingredientsPerPage = 15;

    $scope.searchedIngredients = {status: -1};
    $scope.pantry = {status: -1, data: {}};

    function parsePagination(data, limit, offset) {
        const page = {
            buttons: [],
            pageCount: Math.ceil(data.matches / limit),
            currPage: Math.ceil(offset / limit )
        };

        for (let i = 0;i < page.pageCount;i++) {
            if (i === page.currPage) {
                page.buttons[i] = 'disabled';
            } else {
                page.buttons[i] = 'enabled';
            }
        }

        return page;
    }

    $scope.$watch('search.term', debounce((term) => {
        $scope.getIngredients(0, term);
    }, 350));

    $scope.getIngredients = (page = 0, searchTerm = '%20') => {
        let term = searchTerm;

        if (!term || term.length === 0) {
            term = '%20';
        }

        const offset = page * ingredientsPerPage;

        IngredientService.getSearch({searchTerm: term, offset})
            .then((response) => {
                $scope.searchedIngredients = response;
                $scope.searchedIngredients.pagination = parsePagination(response.data, ingredientsPerPage, offset);
                return true;
            }, () => {
                $scope.searchedIngredients.status = 500;
                return false;
            });
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
}

export default ['$rootScope', '$scope', 'IngredientService', MyIngredientsController];
