import React from "react";
import useMovies from "../useMovies";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, Platform, StatusBar, StyleSheet, View } from "react-native";
import Movie from "../Movie";
import Colors from 'open-color'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    movieList: {
        padding: 20,
    },
    separator: {
        height: 10,
    },
    lodingContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const MoviesScreen = () => {
    const { movies, isLoading } = useMovies();
    return( 
    <SafeAreaView style={styles.container}>
        {
            Platform.OS === 'ios' ? (
                <StatusBar barStyle="light-content"/>
            ) : (
                <StatusBar barStyle="dark-content"/>
        )}

        {
            isLoading ? < View style={styles.lodingContainer}><ActivityIndicator /></View>
            :(
                <FlatList
                contentContainerStyle={styles.movieList}
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
                ItemSeparatorComponent={() => <View style={styles.separator} /> }
         />
            )
        }

    </SafeAreaView>
)}

export default MoviesScreen;