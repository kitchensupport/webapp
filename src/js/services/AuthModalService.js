function AuthModalService($http, $mdDialog) {
    let isOpen = false;
    let modal;

    return {
        open: ($event) => {
            isOpen = true;
            console.log('opened modal');
            $mdDialog.show({
                templateUrl: 'templates/login-modal.html',
                controller: 'LoginController',
                clickOutsideToClose: true,
                targetEvent: $event,
                onRemoving: () => { isOpen = false; }
            });
        },
        close: () => {
            if (isOpen) {
                $mdDialog.hide(modal);
            }
        },
        getModal: () => {
            return modal;
        },
        isOpen: () => {
            return isOpen;
        }
    };
}

export default ['$http', '$mdDialog', AuthModalService];
