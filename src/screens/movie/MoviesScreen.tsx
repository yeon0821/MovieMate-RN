import React from "react";
import useMovies from "./useMovies";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Movie from "./Movie";
import Colors from 'open-color'
import Screen from "../../components/Screen";

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
    const { movies, isLoading, loadMore, canLoadMore, refresh } = useMovies();
    return( 

    <Screen headerVisible = {false}>


        {isLoading ? < View style={styles.lodingContainer}><ActivityIndicator /></View>:(
                <FlatList
                contentContainerStyle={styles.movieList}
                data={movies}
                renderItem={({ item: movie }) => (
                 <Movie 
                    id={movie.id}
                    title={movie.title}
                    originalTitle={movie.originalTitle}
                    releaseDate={movie.releaseDate}
                    overview={movie.overview}
                    posterUrl={movie.posterUrl ?? undefined}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} /> }
                onEndReached={() => {
                if(canLoadMore){
                    loadMore();
                }
            }}
            refreshControl={
              <RefreshControl
                tintColor={Colors.white} 
                refreshing={isLoading} 
                onRefresh={refresh} 
                /> 
             }
            />
         )
     }
    </Screen>
    );
};

export default MoviesScreen;