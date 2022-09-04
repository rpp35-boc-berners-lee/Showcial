import session from 'express-session';
declare module 'express-session' {
   export interface SessionData {
      username: string;
      user: string;
      passport: {
         user: {
            id: string;
            user: string;
         };
      };
   }
}

interface ConfigAPI {
   images: ConfigImages;
   change_keys: string[];
}

interface ConfigImages {
   base_url: string;
   secure_base_url: string;
   backdrop_sizes: string[];
   logo_sizes: string[];
   poster_sizes: string[];
   profile_sizes: string[];
   still_sizes: string[];
}

interface APIResponse {
   page: number;
   results: TVResults | MovieResults | PersonResults;
   total_results: number;
   total_pages: number;
}

interface TVResults {
   poster_path: string | null;
   popularity: number;
   id: number;
   backdrop_path: string | null;
   vote_average: number;
   media_type: string;
   overview: string;
   first_air_date: string;
   origin_country: string[];
   genre_ids: number[];
   original_language: string;
   vote_count: number;
   name: string;
   original_name: string;
}

interface MovieResults {
   poster_path: string | null;
   adult: boolean;
   overview: string;
   release_date: string;
   genre_ids: number[];
   id: number;
   media_type: string;
   original_title: string;
   original_language: string;
   title: string;
   backdrop_path: string | null;
   popularity: number;
   vote_count: number;
   video: boolean;
   vote_average: number;
}

interface PersonResults {
   profile_path: string | null;
   adult: boolean;
   id: number;
   media_type: string;
   known_for: TVResults | MovieResults;
   name: string;
   popularity: number;
}

export {
   ConfigAPI,
   ConfigImages,
   APIResponse,
   TVResults,
   MovieResults,
   PersonResults,
};
