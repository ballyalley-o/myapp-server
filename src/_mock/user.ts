import bcrypt from 'bcryptjs'
import ObjectID from "bson-objectid"

export const user = [
  {
    _id      : ObjectID('5c3b08cf6d663a3c4e8f3568'),
    firstname: 'Tina',
    lastname : 'Mrrero',
    role     : 'customer',
    email    : 'tina@test.com',
    password : bcrypt.hashSync('123456', 10),
  },
  {
    _id      : ObjectID('65d44d6ef8e810489db6a59c'),
    firstname: 'Roky',
    lastname : 'Balboa',
    role     : 'customer',
    email    : 'rocky@boxing.com',
    password : bcrypt.hashSync('123456', 10),
  },
  {
    _id      : ObjectID('65d44d6ef8e810489db6a59d'),
    firstname: 'Emily',
    lastname : 'Brown',
    role     : 'admin',
    email    : 'emily@example.com',
    password : bcrypt.hashSync('123456', 10),
  },
]