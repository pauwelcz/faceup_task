import { gql } from '@apollo/client';
import { RECORD_FIELDS_FRAGMENT } from './graphqlFragments';

export const CREATE_RECORD_MUTATION = gql`
  ${RECORD_FIELDS_FRAGMENT}
  mutation CreateRecord(
    $name: String!
    $title: String!
    $note: String!
    $age: Int!
    $files: [Upload!]!
  ) {
    createRecord(
      createRecordInput: { 
        name: $name, 
        title: $title, 
        note: $note, 
        age: $age, 
        files: $files
      }
    ) {
      ...RecordFields
    }
  }
`;

export const UPDATE_RECORD_MUTATION = gql`
  ${RECORD_FIELDS_FRAGMENT}
  mutation UpdateRecord(
    $id: Int!
    $name: String!
    $title: String!
    $note: String!
    $age: Int!
    $updatedFilesToDelete: [Int!]!
    $files: [Upload!]!
  ) {
    updateRecord(
      updateRecordInput: {
        id: $id
        name: $name
        title: $title
        note: $note
        age: $age,
        updatedFilesToDelete: $updatedFilesToDelete,
        files: $files
      }
    ) {
      ...RecordFields
    }
  }
`;

export const REMOVE_RECORD_MUTATION = gql`
  mutation RemoveRecord($id: Int!) {
    removeRecord(id: $id) {
      id
    }
  }
`;

export const RECORDS_QUERY = gql`
  ${RECORD_FIELDS_FRAGMENT}
  query AllRecords($limit: Int!, $offset: Int!) {
    records(findRecordsArgs: {limit: $limit, offset: $offset}) {
      totalNumber
      records {
        ...RecordFields
      }
    }
  }
`;

export const FILES_BY_RECORD_QUERY = gql`
  query FilesByRecord($recordId: Int!) {
    filesByRecord(recordId: $recordId) {
      totalNumber
      files {
        id
        filename
        extension
      }
    }
  }
`;

export const GENERATE_URL_QUERY = gql`
  query GenerateUrl($id: Int!) {
    generateUrl(id: $id)
  }
`;