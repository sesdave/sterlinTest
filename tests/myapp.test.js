const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


  describe('login', ()=>{
	it("Login a user in",async done =>{
        const response = await request.get('/api/all_teams')
        expect(response.statusCode).toBe(401)
        done()
	
    })
});
describe('Sign up', () => {
    it('sign up a new user', async (done) => {
      const response = await request.post('/api/signup?username=aname&password=somepas&role=1');
      expect(response.statusCode).toBe(500)
      done()
     });
    
     
   });
   describe('Login', () => {
    it('sign in a new user', async (done) => {
      const response = await request.post('/api/signin?username=aname&password=somepas');
      expect(response.statusCode).toBe(500)
      done()
     });
     
   });
   describe('Sign Out', () => {
    it('sign out user', async (done) => {
      const response = await request.post('/api/signout?');
      expect(response.statusCode).toBe(401)
      done()
     });
     
   });
   
   describe('Create Team', () => {
    it('creates a new Team', async (done) => {
      const response = await request.post('/api/create_team?name=teamname');
      expect(response.statusCode).toBe(404)
      done()
     });
     
   });
   describe('Update Team', () => {
    it('Update a Team attribute', async (done) => {
      const response = await request.put('/api/update_team?name=teamname');
      expect(response.statusCode).toBe(404)
      done()
     });
     
   });

   describe('Delete Team', () => {
    it('delete a Team', async (done) => {
      const response = await request.delete('/api/delete_team?name=teamname');
      expect(response.statusCode).toBe(404)
      done()
     });
     
   });

   describe('View Teams', () => {
    it('View a available Teams', async (done) => {
      const response = await request.get('/api/all_teams');
      expect(response.statusCode).toBe(401)
      done()
     });
     
   });

   describe('Search Teams', () => {
    it('Search available Teams', async (done) => {
      const response = await request.get('/api/search_fixtures?sortBy&orderBy=asc&filter=searchname');
      expect(response.status).toBe(200)
      done()
     });
     
   });

   describe('Create Fixture', () => {
    it('creates a new Fixture', async (done) => {
      const response = await request.post('/api/create_fixtures?name=fixturename');
      expect(response.statusCode).toBe(404)
      done()
     });
     
   });
   describe('Update Fixture', () => {
    it('Update a Fixture attribute', async (done) => {
      const response = await request.put('/api/fixtures?name=fixturename');
      expect(response.statusCode).toBe(404)
      done()
     });
     
   });

   describe('Delete Fixture', () => {
    it('delete a Fixture', async (done) => {
      const response = await request.delete('/api/fixtures?name=fixturename');
      expect(response.statusCode).toBe(404)
      done()
     });
     
   });

   describe('View Fixtures', () => {
    it('View a available Fixtures', async (done) => {
      const response = await request.get('/api/all_fixtures');
      expect(response.statusCode).toBe(401)
      done()
     });
     
   });
   describe('View Pending Fixtures', () => {
    it('View a pending fixture', async (done) => {
      const response = await request.get('/api/pending_fixtures');
      expect(response.statusCode).toBe(401)
      done()
     });
     
   });

   describe('View completed Fixtures', () => {
    it('View a completed fixture', async (done) => {
      const response = await request.get('/api/completed_fixtures');
      expect(response.statusCode).toBe(401)
      done()
     });
     
   });

   describe('Search Fixtures', () => {
    it('Search available Fixtures', async (done) => {
      const response = await request.get('/api/search_fixtures?sortBy&orderBy=asc&filter=searchname');
      expect(response.statusCode).toBe(200);
      done();
     });
     
   });