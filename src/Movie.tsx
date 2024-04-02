import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
 
const styles = StyleSheet.create({});

interface MovieProps{
    title: string;
    originalTitle: string;
    releaseDate: string;
    overview: string;
    posterUrl: string;
}

const Movie = ({
    title,
    originalTitle,
    releaseDate,
    overview,
    posterUrl,
}: MovieProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.poster}>
                {posterUrl != null && <Image style={styles.posterImage} source={{uri: posterUrl}} />}
            </View>
            <View style={styles.info}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.originalTitleText}>{originalTitle}</Text>
                <Text style={styles.releaseDateText}>{releaseDate}</Text>
                <Text style={styles.overviewText}>{overview}</Text>
            </View>
        </View>
    );
}


export default Movie;
