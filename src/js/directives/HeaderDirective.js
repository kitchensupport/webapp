function HeaderDirective() {
    return {
        templateUrl: 'templates/partials/header.html',
        scope: true,
        controller: 'HeaderController'
    };
}

export default [HeaderDirective];
