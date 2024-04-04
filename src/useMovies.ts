import { useCallback, useMemo } from "react";
import { Movie } from "./types";
import { getDiscoverMovies } from "./modules/ApiRequest";
import { useQuery } from "react-query";
import moment from "moment";

const useMovies = () => {
    const getUpcommingMovies = useCallback(async () => {
        const result = await getDiscoverMovies({
            releaseDataGte: moment().format('YYYY-MM-DD'),
            releaseDataLte: moment().add(1, 'years').format('YYYY-MM-DD'),
        });
        return result;
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ['upcomming-movies'],
        queryFn: getUpcommingMovies,
    });

    const movies = data?.results ?? [];

    return {
        movies,
        isLoading,
    }
};

export default useMovies;