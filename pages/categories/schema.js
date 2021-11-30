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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getCategoryProducts($categoryId: Int!) {
    category(id: $categoryId){
      id
      name
      url_key
      products{
        items{
          id
          name
          image{
            url
          }
          popular_icon
          rating_summary
          review_count
          url_key
          price_range{
            minimum_price{
              final_price{
                value
              }
              regular_price{
                value
              }
            }
          }
        }
        total_count
      }
    }
  }
`