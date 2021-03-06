describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'NameTest',
      username: 'UsernameTest',
      password: 'PasswordTest'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login')
      cy.get('#username').type('UsernameTest')
      cy.get('#password').type('PasswordTest')
      cy.get('#login-button').click()
      cy.contains('NameTest logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login')
      cy.get('#username').type('WrongUser')
      cy.get('#password').type('wrongPass')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'UsernameTest', password: 'PasswordTest' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('TitleTest')
      cy.get('#author').type('AuthorTest')
      cy.get('#url').type('UrlTest')
      cy.contains('Create').click()
      cy.get('.notification')
        .should('contain', 'A new blog "TitleTest" by "AuthorTest" was added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('view')
        .parent().contains('TitleTest')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title1',
          author: 'Author1',
          url: 'url1.com'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('Likes')
          .parent().contains('0')
        cy.contains('Likes')
          .parent().contains('Like').click()
        cy.contains('Likes')
          .parent().contains('1')
      })

      it('it can be deleted', function () {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.get('.notification')
          .should('contain', '"Title1" was removed succesfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.contains('view').should('not.exist')
      })
    })
    describe('and many blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title1',
          author: 'Author1',
          url: 'url1.com',
          likes: 8
        })
        cy.createBlog({
          title: 'Title2',
          author: 'Author2',
          url: 'url2.com',
          likes: 11
        })
      })

      it('are shown in correct order', function () {
        cy.contains('view').click()
        cy.contains('Likes')
          .parent().contains('11')
      })
    })
  })
})