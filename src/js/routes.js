import {app} from './bootstrap';

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      ($stateProvider, $urlRouterProvider, $locationProvider) => {
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
              });

          // Removes the '#' from page URLs.
          $locationProvider.html5Mode(true);
      }]);
