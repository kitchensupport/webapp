import {app} from '../bootstrap';
import HeaderDirective from './HeaderDirective';
import FooterDirective from './FooterDirective';

app.directive('header', HeaderDirective);
app.directive('footer', FooterDirective);
