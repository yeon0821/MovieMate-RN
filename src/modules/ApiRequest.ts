import axios from "axios";
import { Movie } from "../types";

const API_KEY = '37353d7bf365f487702b78b6dd8ff32b'
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';


const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY,
        language: 'ko-KR'
    },
});

interface MovieResponse {
    poster_path: string | null;
    overview: string;
    release_date: string;
    id: number;
    original_title: string;
    title: string;
}

interface getDiscoverMoviesResponse {
    page: number;
    results: MovieResponse[];
    total_results: number;
    total_pages: number;
}

interface GetDiscoverMoviesParams {
    releaseDataGte?: string;
    releaseDataLte?: string;
}

export const getDiscoverMovies =  async ({ releaseDataGte, releaseDataLte }: GetDiscoverMoviesParams) => {

    // 개봉 예정 영화
    const response = await instance.get<getDiscoverMoviesResponse>(
        'discover/movie', 
        { 
          params: {
            ['release_date.gte']: releaseDataGte,
            ['release_date_lte']: releaseDataLte,
            region: 'KR'
         },
        }
    );
   const movies: Movie[] = response.data.results.map<Movie>(r => ({
    id: r.id,
    title: r.title,
    originalTitle: r.original_title,
    releaseDate: r.release_date,
    overview: r.overview,
    posterUrl: 
        r.poster_path != null? `${IMG_BASE_URL}/${r.poster_path}` : null,
   }));

    return {
        page: response.data.page,
        results: movies,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
    }
};