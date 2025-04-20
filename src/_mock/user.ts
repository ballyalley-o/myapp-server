import argon2 from 'argon2'
import ObjectID from "bson-objectid"

export const user = [
  {
    _id      : ObjectID('5c3b08cf6d663a3c4e8f3568'),
    firstname: 'Tina',
    lastname : 'Mrrero',
    role     : 'customer',
    email    : 'tina@test.com',
    password : argon2.hash('123456')
  },
  {
    _id      : ObjectID('65d44d6ef8e810489db6a59c'),
    firstname: 'Roky',
    lastname : 'Balboa',
    role     : 'customer',
    email    : 'rocky@boxing.com',
    password : argon2.hash('123456')
  },
  {
    _id      : ObjectID('65d44d6ef8e810489db6a59d'),
    firstname: 'Emily',
    lastname : 'Brown',
    role     : 'admin',
    email    : 'emily@example.com',
    password : argon2.hash('123456')
  },
]