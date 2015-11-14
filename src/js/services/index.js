import {app} from '../bootstrap';

import AuthService from './AuthService';
import RecipeService from './RecipeService';
import IngredientService from './IngredientService';

app.factory('AuthService', AuthService);
app.factory('RecipeService', RecipeService);
app.factory('IngredientService', IngredientService);
