function FooterDirective() {
    return {
        templateUrl: 'templates/partials/footer.html',
        scope: true,
        controller: 'FooterController'
    };
}

export default [FooterDirective];
