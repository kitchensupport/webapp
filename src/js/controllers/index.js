import {app} from '../bootstrap';
import HeaderController from './HeaderController';
import FooterController from './FooterController';
import HomeController from './HomeController';
import LoginController from './LoginController';
import RegistrationController from './RegistrationController';
import AuthController from './AuthController';

app.controller('HeaderController', HeaderController);
app.controller('FooterController', FooterController);
app.controller('HomeController', HomeController);
app.controller('LoginController', LoginController);
app.controller('RegistrationController', RegistrationController);
app.controller('AuthController', AuthController);
