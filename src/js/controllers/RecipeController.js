import debounce from 'lodash.debounce';

function RecipeController($scope, RecipeService) {
    const recipesPerPage = 28;

    $scope.searchedRecipes = {status: -1};

    function parsePagination(data, limit, offset) {
        console.log(data);
        console.log(`pagination: ${data} ${limit} ${offset}`);

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
        this.getRecipes(0, term);
    }, 350));

    this.getRecipes = (page = 0, searchTerm = '%20') => {
        let term = searchTerm;

        if (!term || term.length === 0) {
            term = '%20';
        }

        console.log('seraching for a recipe');
        const offset = page * recipesPerPage;

        RecipeService.getSearch({searchTerm: term, offset})
            .then((response) => {
                console.log(`offset:${offset}`);

                console.log(response);
                $scope.searchedRecipes = response;
                $scope.searchedRecipes.pagination = parsePagination(response.data, recipesPerPage, offset);
                return true;
            }, () => {
                $scope.searchedRecipes.status = 500;
                return false;
            });
    };

    $scope.getStars = (numStars) => {
        const stars = [true, true, false];

        for (let i = 0;i < numStars;i++) {
            stars.push(true);
        }
        for (let i = numStars;i < 5;i++) {
            stars.push(false);
        }
        return stars;
    };
}

export default ['$scope', 'RecipeService', RecipeController];
