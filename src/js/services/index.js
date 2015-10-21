import {app} from '../bootstrap';

import AuthService from './AuthService';
import RecipeService from './RecipeService';

app.factory('AuthService', AuthService);
app.factory('RecipeService', RecipeService);
