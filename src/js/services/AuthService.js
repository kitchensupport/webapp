function AuthService($http, $localStorage, $sessionStorage, $mdDialog) {
    let currentUser;
    let modalIsOpen = false;
    let modal;

    return {
        register: (email, password) => {
            return $http.post('http://api.kitchen.support/accounts/create', {
                email,
                password
            });
        },
        login: (args) => {
            if ((args.email && args.email.length > 0) && (args.password && args.password.length > 0)) {
                return $http.post('http://api.kitchen.support/accounts/login', {
                    email: args.email,
                    password: args.password
                }).then((response) => {
                    currentUser = response.data;

                    // Store user info in cookies.
                    if (args.remember) {
                        $localStorage.ksLoginToken = response.data.api_token;
                    } else {
                        $sessionStorage.ksLoginToken = response.data.api_token;
                    }

                });
            } else if (args.api_token && args.api_token.length > 0) {
                return $http.get(`http://api.kitchen.support/account?api_token=${args.api_token}`)
                    .then((response) => {
                        currentUser = response.data;

                        // Store user info in cookies.
                        if (args.remember) {
                            $localStorage.ksLoginToken = response.data.api_token;
                        } else {
                            $sessionStorage.ksLoginToken = response.data.api_token;
                        }
                    });
            }
        },
        logout: () => {
            currentUser = undefined;
            delete $localStorage.ksLoginToken;
            delete $sessionStorage.ksLoginToken;
        },
        forgotPassword: (email) => {
            return $http.post('http://api.kitchen.support/accounts/reset/request', {
                email
            });
        },
        forgotPasswordConfirm: (resetToken, password) => {
            return $http.post('http://api.kitchen.support/accounts/reset/confirm', {
                reset_token: resetToken,
                password
            });
        },
        getCurrentUser: () => {
            return currentUser;
        },
        getApiToken: () => {
            if (currentUser) {
                return currentUser.api_token;
            }

            return '';

        },

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

export default ['$http', '$localStorage', '$sessionStorage', '$mdDialog', AuthService];
