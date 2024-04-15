import { useQuery } from 'react-query';
import { useCallback } from 'react';
import { getMovieDetails } from '../../modules/ApiRequest';

interface UseDetailParams {
  id: number;
}

const useDetail = ({ id }: UseDetailParams) => {
  const getDetail = useCallback(() => getMovieDetails({ id }), [id]);
  const { data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: getDetail,
  });

  return {
    movie: data,
    isLoading,
  };
};

export default useDetail;