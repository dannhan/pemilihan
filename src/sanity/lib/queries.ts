// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

export const VOTES_QUERY = groq`
  *[_type == "vote"]{
    daerah,
    title,
    description,
  }
`;

export const CANDIDATES_QUERY = groq`
  *[_type == "vote" && daerah == $params][0]{
    title,
    kandidat[]{
      nama
    }
  }
`;
