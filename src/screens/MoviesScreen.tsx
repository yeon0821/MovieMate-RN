import React from "react";
import useMovies from "../useMovies";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import Movie from "../Movie";

const style = StyleSheet.create({})

const MoviesScreen = () => {
    const { movies } = useMovies();
    return <SafeAreaView>
        <FlatList
            style={style.movieList}
            data={movies}
            renderItem={({ item: movie }) => (
             <Movie 
                title={movie.title}
                originalTitle={movie.originalTitle}
                releaseDate={movie.releaseDate}
                overview={movie.overview}
                posterUrl={movie.posterUrl ?? undefined}
                />
            )}
     />
    </SafeAreaView>
}

export default MoviesScreen;