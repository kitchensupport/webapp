import angular from 'angular';
import {appName} from './utils/constants';

export const app = angular.module(appName, ['ngMaterial', 'ngMessages', 'ngCookies', 'ngStorage', 'ui.router']);
