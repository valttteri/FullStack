describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'valtteri elias',
      username: 'valtsu',
      password: 'asdfg'
    }
    const user2 = {
      name: 'maiju sofia',
      username: 'maiju1',
      password: 'zxcvb'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username', {force:true}).type('valtsu')
      cy.get('#password', {force:true}).type('asdfg')
      cy.get('#login-button').click({force:true})
      cy.contains('valtsu logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username', {force:true}).type('valtsu')
      cy.get('#password', {force:true}).type('wrong')
      cy.get('#login-button').click({force:true})
      cy.contains('Invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login( {username: 'valtsu', password: 'asdfg'} )
    })

    it('A blog can be created', function() {
      cy.contains('new post').click()
      cy.createBlog( {title: 'blogi', author: 'v.a.', url: 'www.url.fi'} )
      cy.contains('blogi')
    })

    it('a blog can be liked', function() {
      cy.contains('new post').click()
      cy.createBlog( {title: 'blogi', author: 'v.a.', url: 'www.url.fi'} )
      cy.contains('show').click()
      cy.contains('likes: 0')
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('a blog can be deleted', function() {
      cy.contains('new post').click()
      cy.createBlog( {title: 'blogi', author: 'v.a.', url: 'www.url.fi'} )
      cy.contains('show').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'blogi')
    })

    it.only('delete-button is visible only when necessary', function() {
      cy.contains('new post').click()
      cy.createBlog( {title: 'blogi', author: 'v.a.', url: 'www.url.fi'} )
      cy.contains('log out').click()
      cy.login( {username: 'maiju1', password: 'zxcvb'} )
      cy.contains('blogi').click()
      cy.get('html').should('not.contain', 'delete')
    })
  })
})
  
  