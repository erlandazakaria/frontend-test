import { gql } from '@apollo/client';

export const ALL_RESTAURANT = gql`
  query getAllRestaurant {
    getAllRestaurant {
      _id
      name
      opening {
        Sunday {start end}
        Monday {start end}
        Tuesday {start end}
        Wednesday {start end}
        Thursday {start end}
        Friday {start end}
        Saturday {start end}
      }
    }
  }
`;
