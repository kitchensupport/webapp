it('should have a title', () => {
    browser.get('http://localhost:8001');
    expect(browser.getTitle()).toEqual('Kitchen Support');
});
