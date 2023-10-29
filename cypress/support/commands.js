Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{

      cy.get('#firstName').type('Jeniffer')
      cy.get('#lastName').type('Souza')
      cy.get('#email').type('ajenifferbsouza@gmail.com')
      cy.get('#open-text-area').type('teste') // com delay zero = resposta mais rápida;
      cy.contains('button', 'Enviar').click()
})