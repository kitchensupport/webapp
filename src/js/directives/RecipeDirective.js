export function search() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-search.html',
        scope: {
            searchTerm: '@'
        },
        controller: 'RecipeController'
    };
}

export function preview() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-preview.html',
        scope: true,
        link: (scope, element, attributes) => {
            scope.recipe = JSON.parse(attributes.recipeData);
        }
    };
}

export function view() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-view.html',
        controller: 'RecipeViewController'
    };
}
