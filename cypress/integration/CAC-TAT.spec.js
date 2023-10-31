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
      cy.get('#open-text-area').type('teste #99') // com delay zero = resposta mais rápida;
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
    cy.get('#phone-checkbox').check()
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
  it('seleciona um produto (YouTube) por seu texto', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('select').select('YouTube')

  })
  it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('select').select('mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('select').select(1)

  })

  it('marca o tipo de atendimento "Feedback"', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="radio"]').check('feedback').should('be.checked')

  })
  it('marca cada tipo de atendimento', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($radio)=> {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="checkbox"]').check('email').should('be.checked')
    cy.get('input[type="checkbox"]').check('phone').should('be.checked')
    cy.get('input[type="checkbox"]').check().last().uncheck()
  })

  
  it('seleciona um arquivo da pasta fixtures', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(($input) =>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: "drag-drop"}).should(($input) =>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('samplefile')
    cy.get('input[type="file"]').selectFile('@samplefile').should(($input) =>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
  })

  it.only('encontrando o gato', ()=>{
    cy.get('#cat ').invoke('show')
  })

  
})
