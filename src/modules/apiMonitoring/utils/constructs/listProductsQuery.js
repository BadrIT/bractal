/* eslint-disable */

import faker from 'faker';

const listProductsQuery = `
    query ListProductsQuery (
        $input: ProductsQueryInput
    )
    {
        products(
            input: $input
        ) {
            result {
                id
                images
                name
                avg_rating
                price
                discount_price
                has_discount
                has_offer
                hot_deal
            }
            page_info {
                limit
                items_count
            }
        }
    }
`;

export default {
    LIST_PRODUCTS_QUERY: {
        operation: listProductsQuery,
        displayName: 'Query : List Products',
        defaultVariables: {
            input: {
                page: {
                    limit:3
                },
                sales_tactics_tags: ['new_arrivals'],
            }
        },
    },
};
