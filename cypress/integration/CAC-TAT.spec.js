/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function(){
    cy.visit('./src/index.html')
  })

    it('verificar o titulo da aplicação', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
  
  it('preenche os campos obrigatórios e envia o formulário', () => {
    
      cy.get('#firstName').type('JENNA')
      cy.get('#lastName').type('Souza')
      cy.get('#email').type('ajenifferbsouza@gmail.com')
      cy.get('#open-text-area').type('teste', {delay: 0}) // com delay zero = resposta mais rápida;
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')
  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{

    cy.get('#firstName').type('Jeniffer')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('ajenifferbsouza.gmail.com')
    cy.get('#open-text-area').type('teste #02') 
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })
  
  it('validar campo numero continua vazio se digitar caracter não numerico', () =>{
    
    cy.get('#phone').type('abscdf').should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    
    cy.get('#firstName').type('Jeniffer')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('ajenifferbsouza.gmail.com')
    cy.get('#phone').type('abscdf').should('have.value', '')
    cy.get('#open-text-area').type('teste #02') 
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{

    cy.get('#firstName').type('Jeniffer').should('have.value', 'Jeniffer').clear().should('have.value', '')
    cy.get('#lastName').type('Souza').should('have.value', 'Souza').clear().should('have.value', '')
    cy.get('#email').type('ajenifferbsouza.gmail.com').should('have.value', 'ajenifferbsouza.gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('49999926397').should('have.value', '49999926397').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')

  })

})
