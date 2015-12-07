export function search() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-search.html',
        scope: {
            searchTerm: '@'
        },
        controller: 'RecipeController',
        controllerAs: 'recipe'
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

export function liked() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-liked.html',
        scope: true,
        controller: 'MyRecipesController'
    };
}

export function completed() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-completed.html',
        scope: true,
        controller: 'MyRecipesController'
    };
}

export function favorited() {
    return {
        templateUrl: 'templates/partials/recipe/recipe-favorited.html',
        scope: true,
        controller: 'MyRecipesController'
    };
}
