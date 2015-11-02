import {app} from '../bootstrap';
import HeaderDirective from './HeaderDirective';
import FooterDirective from './FooterDirective';
import UnauthorizedDirective from './UnauthorizedDirective';

app.directive('header', HeaderDirective);
app.directive('footer', FooterDirective);
app.directive('unauthorized', UnauthorizedDirective);
