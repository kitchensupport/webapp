import {app} from './bootstrap';

app.config(['$stateProvider', '$urlRouterProvider',
      ($stateProvider, $urlRouterProvider) => {
          $urlRouterProvider.otherwise('/');

          $stateProvider
              .state('home', {
                  url: '/',
                  templateUrl: 'templates/home.html',
                  controller: 'HomeController'
              })
              .state('account', {
                  url: '/account',
                  templateUrl: 'templates/account.html',
                  controller: 'AccountController'
              })
              .state('my-recipes', {
                  url: '/account/recipes',
                  templateUrl: 'templates/my-recipes.html',
                  controller: 'MyRecipesController'
              })
              .state('register', {
                  url: '/register',
                  templateUrl: 'templates/register.html',
                  controller: 'RegistrationController'
              })
              .state('forgot-password', {
                  url: '/forgot-password',
                  templateUrl: 'templates/forgot-password.html',
                  controller: 'RecoveryController'
              })
              .state('forgot-password-token', {
                  url: '/forgot-password/:token',
                  templateUrl: 'templates/forgot-password-token.html',
                  controller: 'RecoveryNewPasswordController'
              })
              .state('recipes', {
                  url: '/recipes',
                  templateUrl: 'templates/recipes.html',
                  controller: 'RecipeController'
              })
              .state('recipeView', {
                  url: '/recipes/recipe/:recipeId',
                  templateUrl: 'templates/recipe.html',
                  controller: 'RecipeViewController'
              });
      }]);
