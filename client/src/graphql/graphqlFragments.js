import { gql } from '@apollo/client';

export const RECORD_FIELDS_FRAGMENT = gql`
  fragment RecordFields on Record {
    id
    age
    name
    title
    note
    created_at
    updated_at
  }
`;