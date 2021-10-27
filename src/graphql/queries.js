/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      username
      firstname
      lastname
      email
      ansone
      anstwo
      ansthree
      ansfour
      ansfive
      anssix
      ansseven
      anseight
      ansnine
      ansten
      doctorname
      appdate
      apptime
      createdAt
      updatedAt
    }
  }
`;
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        firstname
        lastname
        email
        ansone
        anstwo
        ansthree
        ansfour
        ansfive
        anssix
        ansseven
        anseight
        ansnine
        ansten
        doctorname
        appdate
        apptime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
