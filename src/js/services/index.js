import {app} from '../bootstrap';

import AuthService from './AuthService';
import AuthModalService from './AuthModalService';

app.factory('AuthService', AuthService);
app.factory('AuthModalService', AuthModalService);
