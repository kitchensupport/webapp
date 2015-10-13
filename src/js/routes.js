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
              .state('login', {
                  url: '/login',
                  templateUrl: 'templates/login.html',
                  controller: 'LoginController'
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
              });
      }]);
