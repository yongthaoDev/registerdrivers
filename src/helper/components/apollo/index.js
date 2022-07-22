import { gql } from "apollo-boost";

export const PROVINCES = gql`
  query Provinces(
    $where: ProvinceWhereInput
    $orderBy: OrderByInput
    $skip: Int
    $limit: Int
  ) {
    provinces(where: $where, orderBy: $orderBy, skip: $skip, limit: $limit) {
      data {
        id_state
        provinceName
        provinceCode
        province_map_lat
        province_map_lng
        addressInfo
      }
    }
  }
`;

export const DISTRICTS = gql`
  query Districts(
    $where: DistrictWhereInput
    $orderBy: OrderByInput
    $skip: Int
    $limit: Int
  ) {
    districts(where: $where, orderBy: $orderBy, skip: $skip, limit: $limit) {
      data {
        id_list
        title
      }
    }
  }
`;

export const BRANCHES = gql`
  query Branches(
    $limit: Int
    $skip: Int
    $orderBy: OrderByInput
    $where: BranchWhereInput
  ) {
    branches(limit: $limit, skip: $skip, orderBy: $orderBy, where: $where) {
      total
      data {
        branch_name
        id_branch
        branch_address
        branch_code
        address_info
        provinceID {
          id_state
          provinceName
        }
        districtName
        public
      }
    }
  }
`;

export const ANS_ITEM = gql`
  query AnsItem($where: AnsItemWhereInputOne!) {
    ansItem(where: $where) {
      trackingId
      itemName
      receiptName
      receiptPhone
      note
      itemValue_kip
      itemValue_thb
      itemValue_usd
      long
      weight
      priceItem
      createdAt
      deliveredDate
      destinationDate
      originalBranch {
        branchName
        province {
          provinceName
        }
        district {
          districtName
        }
        village {
          villageName
        }
      }
      destinationBranch {
        branchName
        province {
          provinceName
        }
        district {
          districtName
        }
        village {
          villageName
        }
      }
    }
  }
`;

export const VILLAGES = gql`
  query Villages($where: VillageWhereInput, $limit: Int) {
    villages(where: $where, limit: $limit) {
      data {
        _id
        villageName
        villageCode
        detail
        lat
        long
        note
      }
    }
  }
`;

export const LIST_ROUTE_LOCATION = gql`
query Data(
  $where: RouteLocationDriverWhereInput
  $orderBy: OrderByInput
  $skip: Int
  $limit: Int
  $noLimit: Boolean
) {
  routeLocationDrivers(
    where: $where
    orderBy: $orderBy
    skip: $skip
    limit: $limit
    noLimit: $noLimit
  ) {
    data {
      title
      locationCode
      _id
      isPublic
      priceDay
      priceNight
    }
  }
}
`;
