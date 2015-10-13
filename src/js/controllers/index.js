import {app} from '../bootstrap';
import HeaderController from './HeaderController';
import FooterController from './FooterController';
import HomeController from './HomeController';
import LoginController from './LoginController';
import RegistrationController from './RegistrationController';
import RecoveryController from './RecoveryController';
import RecoveryNewPasswordController from './RecoveryNewPasswordController';

app.controller('HeaderController', HeaderController);
app.controller('FooterController', FooterController);
app.controller('HomeController', HomeController);
app.controller('LoginController', LoginController);
app.controller('RegistrationController', RegistrationController);
app.controller('RecoveryController', RecoveryController);
app.controller('RecoveryNewPasswordController', RecoveryNewPasswordController);
