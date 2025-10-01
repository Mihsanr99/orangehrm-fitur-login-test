describe('ReqRes API Automation Testing', () => {
  const baseUrl = 'https://reqres.in/api';
  const apiKey = 'reqres-free-v1';

  // 1. GET - List Users
  it('TESTAPI01 -> GET - Should fetch list of users successfully', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
    cy.logResponse(response);
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');
    expect(response.body.page).to.eq(2);
    expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  // 2. GET - Single User
  it('TESTAPI02 -> GET - Should fetch single user by ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
    cy.logResponse(response);
    expect(response.status).to.eq(200);
    expect(response.body.data).to.have.property('id', 2);
    expect(response.body.data).to.have.property('email');
    expect(response.body.data).to.have.property('first_name');
    expect(response.body.data).to.have.property('last_name');
    });
  });
  // 3. GET - Single User Not Found
  it('TESTAPI03 -> GET - Should return 404 for non-existent user', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers: {
        'x-api-key': apiKey
      },
      failOnStatusCode: false
    }).then((response) => {
    cy.logResponse(response);
    expect(response.status).to.eq(404);
    expect(response.body).to.be.empty;
    });
  });
  // 4. GET - List Resources
  it('TESTAPI04 -> GET - list of resources', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
    cy.logResponse(response);
    expect(response.status).to.eq(200);
    expect(response.body.data).to.be.an('array');
    expect(response.body.data[0]).to.have.property('name');
    expect(response.body.data[0]).to.have.property('color');
    });
  });
  // 5. GET - Single Resource
  it('TESTAPI05 -> GET - single resource by ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown/2`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
    cy.logResponse(response);
    expect(response.status).to.eq(200);
    expect(response.body.data).to.have.property('id', 2);
    expect(response.body.data).to.have.property('name');
    expect(response.body.data).to.have.property('year');
    expect(response.body.data).to.have.property('color');
    expect(response.body.data).to.have.property('pantone_value');
    });
  });
  // 6. GET - Delayed Response
  it('TESTAPI06 -> GET - Should handle delayed response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers: {
        'x-api-key': apiKey
      },
      timeout: 10000
    }).then((response) => {
      cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an('array');
      expect(response.duration).to.be.greaterThan(3000);
    });
  });
  // 7. GET - Verify Response Headers
  it('TESTAPI07 -> GET - Should have correct response headers', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/1`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
      cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');
    });
  });
    // 8. GET - Validate Response Time
  it('TESTAPI08 -> Should respond within acceptable time', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
      cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(2000);
    });
  });
  // 9. POST - Create User
  it('TESTAPI09 -> POST - create new user successfully', () => {
    const newUser = {
      name: 'Ihsan Rafii',
      job: 'QA Engineer'
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        'x-api-key': apiKey
      },
      body: newUser
    }).then((response) => {
      cy.logResponse(response);
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', newUser.name);
      expect(response.body).to.have.property('job', newUser.job);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
    });
  });
  //10. POST - Register Successfully
  it('TESTAPI10 -> POST - register user successfully', () => {
    const credentials = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: {
        'x-api-key': apiKey
      },
      body: credentials
    }).then((response) => {
      cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
    });
  });
  // 11. POST - Login Successful
  it('TESTAPI11 -> POST - login successfully', () => {
    const credentials = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: {
        'x-api-key': apiKey
      },
      body: credentials
    }).then((response) => {
        cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      expect(response.body.token).to.not.be.empty;
    });
  });
  // 12. POST - Login Unsuccessful
  it('TESTAPI12 -> POST - fail login without password', () => {
    const credentials = {
      email: 'peter@klaven'
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: {
        'x-api-key': apiKey
      },
      body: credentials,
      failOnStatusCode: false
    }).then((response) => {
        cy.logResponse(response);
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Missing password');
    });
  });
  // 13. POST - Register Unsuccessful (Missing Password)
  it('TESTAPI13 -> POST - fail registration without password', () => {
    const credentials = {
      email: 'sydney@fife'
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: {
        'x-api-key': apiKey
      },
      body: credentials,
      failOnStatusCode: false
    }).then((response) => {
        cy.logResponse(response);
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.include('Missing password');
    });
  });
  // 14. PUT - Update User
  it('TESTAPI14 -> PUT - update user completely', () => {
    const updatedUser = {
      name: 'M. Ihsan Rafii',
      job: 'TL QA Engineer'
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey
      },
      body: updatedUser
    }).then((response) => {
        cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', updatedUser.name);
      expect(response.body).to.have.property('job', updatedUser.job);
      expect(response.body).to.have.property('updatedAt');
    });
  });
  // 15. PATCH - Update User Partially
  it('TESTAPI15 -> PATCH - update user partially', () => {
    const partialUpdate = {
      job: 'Head Departemen'
    };

    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey
      },
      body: partialUpdate
    }).then((response) => {
        cy.logResponse(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', partialUpdate.job);
      expect(response.body).to.have.property('updatedAt');
    });
  });
  // 16. DELETE - Delete User
  it('TESTAPI16 -> DELETE - delete user successfully', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers: {
        'x-api-key': apiKey
      }
    }).then((response) => {
        cy.logResponse(response);
      expect(response.status).to.eq(204);
      expect(response.body).to.be.empty;
    });
  });
  // 17. Requests - Create, Update, then Delete
  it('TESTAPI17 -> perform chained operations: Create -> Update -> Delete', () => {
    let userId;

    // Create user
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {
        'x-api-key': apiKey
      },
      body: {
        name: 'Test User',
        job: 'Tester'
      }
    }).then((createResponse) => {
      cy.log('=== CREATE USER RESPONSE ===');
      cy.logResponse(createResponse);

      expect(createResponse.status).to.eq(201);
      userId = createResponse.body.id;

      // Update user
      return cy.request({
        method: 'PUT',
        url: `${baseUrl}/users/${userId}`,
        headers: {
          'x-api-key': apiKey
        },
        body: {
          name: 'Rafii',
          job: 'Senior Tester'
        }
      });
    }).then((updateResponse) => {
        cy.log('=== Update User Response ===');
        cy.logResponse(updateResponse);

      expect(updateResponse.status).to.eq(200);
      expect(updateResponse.body.name).to.eq('Rafii');

      // Delete user
      return cy.request({
        method: 'DELETE',
        url: `${baseUrl}/users/${userId}`,
        headers: {
          'x-api-key': apiKey
        }
      });
    }).then((deleteResponse) => {
        cy.log('=== Delete User Response ===');
        cy.logResponse(deleteResponse);

      expect(deleteResponse.status).to.eq(204);
    });
  });
});