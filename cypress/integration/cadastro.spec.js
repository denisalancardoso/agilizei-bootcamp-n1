/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();


context('Cadastro de usuário no site', () => {
    it('Acessa o site', () => {
        
        cy.visit('index.php');
    
    });

    it('Acessa área para login/Criação Conta', () => {
        // Clica em 'Sign in'
        cy.get('[class="login"]').click('center');
    });

    it('Acessa o formulário para criação de conta', () => {
        // Informa o e-mail
        cy.get('input#email_create').type(chance.email());

        // Clica no botão 'Create Account'
        cy.get('button#SubmitCreate').click('center');

    });

    it('Preenche o formulário', () => {      
            
    // Formulário 'Your Personal Information'
        cy.get('input[id="id_gender1"]').check();
        cy.get('input[id="customer_firstname"]').type(chance.first({nationality: 'en'}));
        cy.get('input[id="customer_lastname"]').type(chance.last());
        
        cy.get('input[id="email"]').clear();
        cy.get('input[id="email"]').type(chance.email());       
        // cy.get('input[id="email"]').click()
        cy.get('input[id="passwd"]').type('bootcamp2020');

        cy.get('select#days').select('5')
        cy.get('select#months').select('August')
        cy.get('select#years').select('1985')

        cy.get('input#newsletter').check()
        cy.get('input#optin').check()

    // Your address
        
        // cy.get('input#firstname').type(chance.first());
        // cy.get('input#lastname').type(chance.last());
        cy.get('input#company').type(chance.company());

        cy.get('input#address1').type(chance.address());
        cy.get('input#address2').type('Apartament');
        cy.get('input#city').type(chance.city()); 
        cy.get('select#id_state').select('California');
        cy.get('input#postcode').type(chance.zip());
        cy.get('select#id_country').should('contain.text', 'United States');
        cy.get('textarea#other').type(chance.phone({country: 'us'}));        
        cy.get('input#phone').type(chance.phone());
        cy.get('input#phone_mobile').type(chance.phone({country: 'us', mobile:true}));
        cy.get('input#alias').clear();
        cy.get('input#alias').type(chance.address());

        cy.get('button#submitAccount').click();
    });

    it('Valida redirecionamento url correta', () => {
        
        cy.url().should('contain', 'controller=my-account')

    });

    it('Valida exibição do texto', () => {
        
        cy.get('[class="info-account"]')
            .should('have.text', 'Welcome to your account. Here you can manage all of your personal information and orders.')

    });
});