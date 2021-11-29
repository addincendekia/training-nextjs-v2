import { gql } from "@apollo/client";

export const DEFAULT_ATRIBUTE_CATEGORIES_FR = gql`
    fragment defaultAtributeCategoriesFr on CategoryTree {
        id
        name
        description
    }
`

export const GET_CATEGORIES = gql`
query getCategories($categoryKey: String) {
    mainCategories: categories(filters: {
      url_key: {
        eq: $categoryKey
      }
    }) {
      items{
        ...defaultAtributeCategoriesFr
        children{
          ...defaultAtributeCategoriesFr
          url_key
          products{
            total_count
          }
          include_in_menu
          popular_icon
        }
        __typename
      }
      total_count
      __typename
    }
}
${DEFAULT_ATRIBUTE_CATEGORIES_FR}
`