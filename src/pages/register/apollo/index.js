import { gql } from "apollo-boost";

export const QUERY_FEEDBACK = gql`
query FeedBacks($where: FeedBackWhereInput, $orderBy: OrderByInput, $skip: Int, $limit: Int) {
  feedBacks(where: $where, orderBy: $orderBy, skip: $skip, limit: $limit) {
    total
    data {
      _id
      title
      content
      reportType
      status
      image
      createdAt
      updatedBy
      updatedAt
    }
  }
}
`;

export const CREATE_REGISTER_DRIVERS = gql`
mutation CreateRegisterDriverPartner($data: RegisterDriverPartnerInput!) {
  createRegisterDriverPartner(data: $data) {
    _id
  }
}
`;