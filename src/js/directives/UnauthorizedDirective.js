function UnauthorizedDirective() {
    return {
        templateUrl: 'templates/partials/unauthorized.html',
        scope: true
    };
}

export default [UnauthorizedDirective];
