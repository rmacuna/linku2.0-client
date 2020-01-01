import { gql } from 'apollo-boost';

export const GET_SUBJECTS_QUERY = gql`
  query getSubjects($search: String) {
    getSubjects(search: $search) {
      docs {
        id
        name
        departmentName
        code
        number
      }
      pageInfo {
        totalPages
        nextPage
        prevPage
      }
    }
  }
`;
