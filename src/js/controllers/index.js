import angular from 'angular';
import {appName} from '../utils/constants';
import HeaderController from './HeaderController';
import LogController from './LogController';

const app = angular.module(appName);

app.controller('HeaderController', HeaderController);
app.controller('LogController', LogController);
