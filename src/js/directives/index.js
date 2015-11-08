import {app} from '../bootstrap';
import HeaderDirective from './HeaderDirective';
import FooterDirective from './FooterDirective';
import UnauthorizedDirective from './UnauthorizedDirective';
import RecipeDirective from './RecipeDirective';

app.directive('header', HeaderDirective);
app.directive('footer', FooterDirective);
app.directive('unauthorized', UnauthorizedDirective);
app.directive('recipe', RecipeDirective.view);
app.directive('recipesearch', RecipeDirective.search);
