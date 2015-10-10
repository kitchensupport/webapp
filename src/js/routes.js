import {app} from 'bootstrap';

app.config(['$routeProvider',
      ($routeProvider) => {
          $routeProvider.when('/', {
              templateUrl: 'templates/home.html',
              controller: 'LogController'
          });
      }]);
