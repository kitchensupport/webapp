const LoginModal = require('./../utils/LoginModal');

describe('homepage login', () => {
    it('should open modal', () => {
        browser.get('http://localhost:8001');
        LoginModal.open();
        expect(LoginModal.isOpen()).toEqual(true);
    });

    it('should display login no input error message', () => {
        element(by.id('modal-loginButton')).click();
        expect(element(by.css('ng-messages[for="loginForm.general"]>ng-message[when="no-input"]')).isPresent()).toEqual(true);
    });

    it('should display login no password error message', () => {
        LoginModal.login('test@test.com', '');
        expect(element(by.css('ng-messages[for="loginForm.password"]>ng-message[when="required"]')).isPresent()).toEqual(true);
    });

    it('should fail to log user in', () => {
        expect(LoginModal.login('test@test.com', 'test')).toEqual(false);
    });

    it('should display login failed message', () => {
        expect(element(by.css('ng-messages[for="loginForm.general"]>ng-message[when="incorrect"]')).isPresent()).toEqual(true);
    });

    it('should log user in', () => {
        expect(LoginModal.login('t@t.com', 'test')).toEqual(true);
    });
});
