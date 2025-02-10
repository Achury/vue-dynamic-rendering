describe('DynamicRenderer E2E Tests', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('/');
  });

  it('renders ComponentA when selected', () => {
    // Mock the API response for ComponentA
    cy.intercept('GET', '/api/data', {
      statusCode: 200,
      body: {
        ComponentA: [
          { id: 1, title: 'Test Post', body: 'This is a test post.' },
        ],
      },
    });

    // Click the "Show Component A" button
    cy.contains('Show Component A').click();

    // Verify that ComponentA is rendered and displays the post
    cy.contains('Component A').should('exist'); // Check for the component's title
  });

  it('displays loading state while fetching data', () => {
    // Simulate a loading state
    cy.intercept('GET', '/api/data', {
      delay: 1000, // Simulate a delay
      statusCode: 200,
      body: [],
    });

    // Verify the loading state
    cy.contains('Loading...').should('exist');
  });

  it('navigates between components', () => {
    // Mock the API response for ComponentB
    cy.intercept('GET', '/api/data', {
      statusCode: 200,
      body: {
        ComponentB: [
          { id: 2, title: 'Another Post', body: 'This is another post.' },
        ],
      },
    });

    // Click the "Show Component B" button
    cy.contains('Show Component B').click();

    // Verify that ComponentB is rendered
    cy.contains('Component B').should('exist');

    // Mock the API response for ComponentC
    cy.intercept('GET', '/api/data', {
      statusCode: 200,
      body: {
        ComponentC: [
          {
            id: 3,
            title: 'Yet Another Post',
            body: 'This is yet another post.',
          },
        ],
      },
    });

    // Click the "Show Component C" button
    cy.contains('Show Component C').click();

    // Verify that ComponentC is rendered
    cy.contains('Component C').should('exist');
  });
});
