function TestController($scope) {
    $scope.displayMessage = () => {
        if ($scope.name) {
            $scope.message = `Hi, ${$scope.name}!`;
        } else {
            $scope.message = 'Please enter a name';
        }
    };
}

export default ['$scope', TestController];
