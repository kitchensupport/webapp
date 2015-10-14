function AuthService($http, $cookies, $mdDialog) {
    let currentUser;
    let modalIsOpen = false;
    let modal;

    return {
        loginToken: (token) => {
            if (token) {
                $http.get(`http://api.kitchen.support/account?token=${token}`)
                .success((response) => {
                    currentUser = response.user;
                });
            }
        },
        login: (email, password, remember, callback) => {
            try {
                $http.post('http://api.kitchen.support/accounts/login',
                    {email, password}
                ).success((response) => {
                    currentUser = response.user;

                    // Store user info in cookies.
                    if (remember) {
                        $cookies.ksLoginToken = currentUser.token;
                    }

                    callback('SUCCESS');
                    return 'SUCCESS';
                })
                .error(() => {
                    callback('FAILURE');
                    return 'FAILURE';
                });
            } catch (err) {
                callback('ERROR');
                return 'ERROR';
            }
        },
        logout: () => {
            currentUser = undefined;
            $cookies.ksLoginToken = undefined;
        },
        isLoggedIn: () => {
            return !!currentUser;
        },
        currentUser: () => { return currentUser; },

        // login modal functions
        loginModal: {
            open: ($event) => {
                modalIsOpen = true;
                $mdDialog.show({
                    templateUrl: 'templates/login-modal.html',
                    controller: 'LoginController',
                    clickOutsideToClose: true,
                    targetEvent: $event,
                    onRemoving: () => { modalIsOpen = false; }
                });
            },
            close: () => {
                if (modalIsOpen) {
                    $mdDialog.hide(modal);
                }
            },
            getModal: () => {
                return modal;
            },
            isOpen: () => {
                return modalIsOpen;
            }
        }
    };
}

export default ['$http', '$cookies', '$mdDialog', AuthService];
