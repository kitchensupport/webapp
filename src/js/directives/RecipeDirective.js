function RecipeDirective() {
    return {
      search: {
          templateUrl: 'templates/partials/recipe-search.html',
          scope: true,
          controller: 'RecipeController'
      },
      view: {
        templateUrl: 'templates/partials/recipe.html',
        scope: true,
        controller: 'RecipeController'
      }
    };
}

export default [RecipeDirective];
