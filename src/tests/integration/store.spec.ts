import { IUser, IUserToAuthJSON } from '@/models/user.model'
import faker from 'faker'
import request from 'supertest'
import app from '@/app'
import setupTestDB from '../utils/setupTestDB'
import { user } from '../fixtures/user.fixture'

setupTestDB()

const registerUser = async () => {
  const res = await request(app).post('/register').send(user).expect(200)
  token = res.body.token
}

let token: string

describe('User Routes', () => {
  let newUser: IUserToAuthJSON

  beforeEach(async () => {
    newUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    }
    await registerUser()
  })

  describe('POST /user', () => {
    it('should return User with 200 status', async () => {
      const res = await request(app).post('/login').set('Authorization', `bearer ${token}`).send(newUser).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('first_name')
      expect(res.body).toHaveProperty('last_name')
    })

    it('should return 400 status if name is less than 3 characters', async () => {
      newUser.name = 'xx'
      await request(app).post('/user').set('Authorization', `bearer ${token}`).send(newUser).expect(400)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).post('/user').send(newUser).expect(401)
    })
  })

  describe('GET /user', () => {
    it('should return Users array with 200 status ', async () => {
      const res = await request(app).get('/user').expect(200)
      expect(res.body).toEqual([])
    })
  })

  describe('GET /user', () => {
    it('should return User with 200 status ', async () => {
      const resInsert = await request(app)
        .post('/user')
        .set('Authorization', `bearer ${token}`)
        .send(newUser)
        .expect(200)
      const res = await request(app).get(`/user/${resInsert.body._id}`).expect(200)
      expect(res.body).toHaveProperty('first_name')
      expect(res.body).toHaveProperty('last_name')
      expect(res.body).toHaveProperty('avatar')
    })

    it('should return 404 error if not found User by id ', async () => {
      await request(app).get('/user/60aa2e8ed87c9ffe67df0000').expect(404)
    })
  })

  describe('PATCH /user', () => {
    it('should return User with 200 status ', async () => {
      const resInsert = await request(app)
        .post('/user')
        .set('Authorization', `bearer ${token}`)
        .send(newUser)
        .expect(200)

      const updateUser: IUser = {
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        salt: '',
        role: '',
        active: false,
      }

      const res = await request(app)
        .patch(`/user/${resInsert.body._id}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          User: updateUser,
        })
        .expect(200)
      expect(res.body.first_name).toEqual(updateUser.first_name)
      expect(res.body.last_name).toEqual(updateUser.last_name)
      expect(res.body.avatar).toEqual(updateUser.avatar)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).patch('/user/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found User by id ', async () => {
      await request(app).patch('/user/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })

  describe('DELETE /user', () => {
    it('should delete User with 204 status ', async () => {
      const resInsert = await request(app)
        .post('/user')
        .set('Authorization', `bearer ${token}`)
        .send(newUser)
        .expect(200)
      await request(app).delete(`/user/${resInsert.body._id}`).set('Authorization', `bearer ${token}`).expect(204)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).delete('/user/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found User by id ', async () => {
      await request(app).delete('/user/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })
})
