import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($userInputData: UserInputData!) {
    updateUser(userInputData: $userInputData) {
      username
      photoURL
      coverPhoto
      linkedin
      github
      portfolio
      bio
      location
    }
  }

`