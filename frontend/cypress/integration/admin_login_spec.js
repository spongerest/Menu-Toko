describe('Admin Login', () => {
    it('should allow an admin to log in', () => {
        cy.visit('/admin/login');
        cy.get('input[name="email"]').type(Cypress.env('adminEmail'));
        cy.get('input[name="password"]').type(`${Cypress.env('adminPassword')}{enter}`);

        cy.url().should('include', '/admin/dashboard');
        cy.get('.dashboard-indicator').should('be.visible');
    });

    it('should display an error message for wrong credentials', () => {
        cy.visit('/admin/login');
        cy.get('input[name="email"]').type('wrong@example.com');
        cy.get('input[name="password"]').type('wrongpassword{enter}');

        cy.get('.error-message').should('be.visible').and('contain', 'Invalid email or password');
    });
});