function HeaderController($scope) {
    $scope.openMenu = ($mdOpenMenu, ev) => {
        $mdOpenMenu(ev);
    };
}

export default ['$scope', HeaderController];
