import {app} from '../bootstrap';
import HeaderController from './HeaderController';
import FooterController from './FooterController';
import HomeController from './HomeController';

app.controller('HeaderController', HeaderController);
app.controller('FooterController', FooterController);
app.controller('HomeController', HomeController);
