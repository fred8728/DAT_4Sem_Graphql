import mongoose from "mongoose";
import { Friends } from "./dbConnectors";

//resolver map
export const resolvers = {
  Query: {
    getOneFriend: (root, { id }) => {
      return Friends.findById(id);
    },
    allFriends: () => {
      return Friends.find({})
    },
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        age: input.age,
        language: input.language,
        email: input.email,
        contacts: input.contacts,
      });
      newFriend.id = newFriend._id;
      return newFriend.save();
    },
    updateFriend: (root, { input }) => {
      return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });
    },
    deleteFriend: (root, { id }) => {
      try {
        Friends.findOneAndRemove({ _id: id });
        return `Friend with id: ${id} deleted`;
      } catch (err) {
        return `Failed to delete friend with id: ${id} deleted`;
      }
    },
  },
};

// insert this to create a friend, and then see id and firstname afterwards
// mutation{createFriend(input: {firstName: "Frederikke" lastName: "Nilsson" gender: "Female" email:"something@hotmail.com "}){id firstName}}

// Querying with aliases
/** 
     * query { 
one: getOneFriend(id: "5ead2aa2a57a8737bcf69782"){ 
firstName
  lastName
  gender
}
  two: getOneFriend(id: "5ead2a8ca57a8737bcf69781"){ 
firstName
  lastName
    gender
  } 
  three: getOneFriend(id: "5eac5f29cd11bf0744cc490a"){ 
firstName
  lastName
    gender
}
}
     */

//Querying with fragment

/**
 * query { 
one: getOneFriend(id: "5ead2aa2a57a8737bcf69782"){ 
	...friendFragment
}
  two: getOneFriend(id: "5ead2a8ca57a8737bcf69781"){ 
...friendFragment
  } 
  three: getOneFriend(id: "5eac5f29cd11bf0744cc490a"){ 
...friendFragment
}
}

fragment friendFragment on Friend { 
	firstName
  lastName
  gender
  email
}
 */
