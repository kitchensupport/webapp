import angular from 'angular';
import {appName} from '../utils/constants';
import HeaderDirective from './HeaderDirective';

const app = angular.module(appName);

app.directive('header', HeaderDirective);
