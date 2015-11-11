import {app} from '../bootstrap';
import HeaderDirective from './HeaderDirective';
import FooterDirective from './FooterDirective';
import UnauthorizedDirective from './UnauthorizedDirective';
import {preview as RecipePreviewDirective, search as RecipeSearchDirective} from './RecipeDirective';
import {view as RecipeViewDirective, liked as RecipesLikedDirective} from './RecipeDirective';

app.directive('header', HeaderDirective);
app.directive('footer', FooterDirective);
app.directive('unauthorized', UnauthorizedDirective);
app.directive('recipepreview', RecipePreviewDirective);
app.directive('recipesearch', RecipeSearchDirective);
app.directive('recipeview', RecipeViewDirective);
app.directive('recipesliked', RecipesLikedDirective);
