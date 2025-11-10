const request = require('supertest');
const app = require('../server');

describe('📚 Bookstore API', () => {
  it('GET /api/books → should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/books/:id → should return a single book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('title');
  });

  it('GET /api/books/:id → should return 404 for non-existent book', async () => {
    const res = await request(app).get('/api/books/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Book not found');
  });

  it('POST /api/books → should create a new book', async () => {
    const newBook = {
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      copiesAvailable: 8
    };

    const res = await request(app)
      .post('/api/books')
      .send(newBook);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newBook);
    expect(res.body).toHaveProperty('id');
  });

  it('PUT /api/books/:id → should update an existing book', async () => {
    const updatedBook = { title: 'Nineteen Eighty-Four' };
    const res = await request(app)
      .put('/api/books/3')
      .send(updatedBook);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Nineteen Eighty-Four');
  });

  it('PUT /api/books/:id → should return 404 for non-existent book', async () => {
    const res = await request(app)
      .put('/api/books/9999')
      .send({ title: 'Does Not Exist' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Book not found');
  });

  it('DELETE /api/books/:id → should delete a book', async () => {
    const res = await request(app).delete('/api/books/2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 2);
  });
  
  it('DELETE /api/books/:id → should return 404 for non-existent book', async () => {
    const res = await request(app).delete('/api/books/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Book not found');
  });
});
