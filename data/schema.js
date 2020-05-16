import { resolvers } from './resolvers'
import { makeExecutableSchema } from 'graphql-tools'
const typeDefs = `
type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: Gender
    age: Int
    language: String
    email: String
    contacts:[Contact]
}

type Contact {
    firstName: String
    lastName: String
}

enum Gender{
    MALE
    FEMALE
    ANOTHER
}

type Query {
    getOneFriend(id: ID!): Friend
    allFriends: [Friend]!
}

input FriendInput {
    id: ID
    firstName: String!
    lastName: String
    gender: Gender
    age: Int
    language: String
    email: String 
    contacts: [ContactInput]
}

input ContactInput {
    firstName: String
    lastName: String
}

type Mutation {
    createFriend(input: FriendInput): Friend
    updateFriend(input: FriendInput): Friend
    deleteFriend(id: ID!): String
}`;


const schema = makeExecutableSchema({ typeDefs, resolvers})
export { schema }

//Update example
/**
 * mutation {
  updateFriend(input: 
    {id: "5eac5f29cd11bf0744cc490a", 
      firstName: "Kirsten",
      age: 44}) {
    id
  }
}

 */

//Creating contacts 
/* mutation{createFriend(input: 
  {firstName: "Frederikke" 
  lastName: "Nilsson" 
  gender: FEMALE 
  age: 24 
  email:"something@hotmail.com "
contacts: [
  {firstName: "Jacob", 
  lastName: "Jabr"}
  {firstName: "Cathrine", 
  lastName: "Nilsson"}
]})
{id
  firstName
  age
  contacts {
    firstName
    lastName
  }
}}
*/