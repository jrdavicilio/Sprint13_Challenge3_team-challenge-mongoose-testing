const request = require ('supertest')
const app = require ('../index')
const Post = require('../models/Post')

describe ('testing/posts', () => {
    const post = {
        title: 'title',
        body: 'body'
    }

    beforeEach(async () => {
    await Post.deleteMany();
  })
  
  test('Create a post', async () => {
      let postsCount = await Post.countDocuments ({})
      expect(postsCount).toBe(0)
      
      const resPost = await request(app).post('/create').send(post).expect(201)
      
      postsCount = await Post.countDocuments ({})
      expect(postsCount).toBe(1)
      expect(resPost.body._id).toBeDefined()
      expect(resPost.body.title).toBe(post.title)
      expect(resPost.body.body).toBe(post.body)
      expect(resPost.body.createdAt).toBeDefined()
      expect(resPost.body.updatedAt).toBeDefined()
      
    })

    test('Get all posts', async () => {

        await Post.create({ title: 'title 1', body: 'body 1' })
        await Post.create({ title: 'title 2', body: 'body 2' })
        
        const res = await request(app).get('/')
        
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBeGreaterThanOrEqual(2)
        expect(res.body[0]).toHaveProperty('title')
        expect(res.body[0]).toHaveProperty('body')
});
    
})