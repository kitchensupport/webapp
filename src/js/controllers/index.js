import angular from 'angular';
import {appName} from '../utils/constants';
import TestController from './TestController';

const app = angular.module(appName);

app.controller('TestController', TestController);
