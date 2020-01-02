import { gql } from 'apollo-boost';

export const GET_SUBJECTS_QUERY = gql`
  query getSubjectsQuery($search: String) {
    getSubjects(search: $search) {
      docs {
        id
        name
        departmentName
        mat
      }
      pageInfo {
        totalPages
        nextPage
        prevPage
      }
    }
  }
`;

export const GET_SUBJECT_GROUPS = gql`
  query getSubjectGroupsQuery($subjectId: ID!) {
    getSubjectGroups(subjectId: $subjectId) {
      nrc
      group
      professors {
        firstname
        lastname
      }
      schedule {
        time {
          start
          end
        }
        place
        day
        startDate
        endDate
      }
      quota {
        taken
        free
      }
    }
  }
`;