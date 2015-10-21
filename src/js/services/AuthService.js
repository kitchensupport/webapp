import {messages} from '../utils/constants';

function AuthService($http, $q, $cookies, $mdDialog) {
    let currentUser;
    let modalIsOpen = false;
    let modal;

    return {
        loginToken: (token) => {
            if (token && token.length > 0) {
                return $http.get(`http://api.kitchen.support/account?token=${token}`)
                .then((response) => {
                    currentUser = response.data.user;
                });
            }
        },
        register: (email, password) => {
            return $http.post('http://api.kitchen.support/accounts/create', {
                email,
                password
            });
        },
        login: (email, password, remember) => {
            return $http.post('http://api.kitchen.support/accounts/login', {
                email,
                password
            }).then((response) => {
                currentUser = response.data.user;

                // Store user info in cookies.
                if (remember) {
                    $cookies.ksLoginToken = response.data.user.api_token;
                }
            });

        },
        logout: () => {
            currentUser = undefined;
            $cookies.ksLoginToken = undefined;
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
        isLoggedIn: () => {
            const deffered = $q.defer();

            setTimeout(() => {
                if (currentUser === undefined) {
                    deffered.reject(messages.authRequired);
                } else {
                    deffered.resolve(currentUser);
                }
            }, 0);

            // Fail if the user is not authenticated.
            return deffered.promise;
        },
        getCurrentUser: () => { return currentUser; },

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

export default ['$http', '$q', '$cookies', '$mdDialog', AuthService];
