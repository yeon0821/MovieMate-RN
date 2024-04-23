import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../../components/Screen';
import { RootStackParmList } from '../../types';
import useDetail from './useDetail';
import Colors from 'open-color';
import Section from './Section';
import People from './People';
import YouTubeVideo from './YouTubeVideo';
import CalendarModule from '../../modules/CalendarModule';
import moment from 'moment';
import useReminder from '../../hook/useReminder';


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: Colors.gray[3],
  },
  infoTexts: {
    flex: 1,
    marginLeft: 20,
  },
  titleTexts: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: 'bold',
  },
  originalTitleText: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.white,
  },
  releaseDateText: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.white,
  },
  overviewText: {
    fontSize: 14,
    color: Colors.white,
  },
  separator: {
    width: 16,
  },
  verticalSeparator: {
    height: 16,
  },
  addToCalendarButton: {
    marginTop: 8,
    backgroundColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
  addToCalendarButtonText: {
    color: Colors.black,
  },
});

const DetailScreen = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParmList, 'Detail'>>();

  const { movie, isLoading } = useDetail({ id });
  const { addReminder, hasReminder } = useReminder();

  const renderMovie = useCallback(() => {
    if (movie == null) {
      return null;
    }

    const {
      posterUrl,
      title,
      originalTitle,
      releaseDate,
      overview,
      crews,
      casts,
      videos,
    } = movie;

    const director = crews.find(crew => crew.job === 'Director');
    const youTubeVideos = videos.filter(video => video.site === 'YouTube');

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <View style={styles.poster}>
            {posterUrl != null && (
              <Image style={styles.poster} source={{ uri: posterUrl }} />
            )}
          </View>
          <View style={styles.infoTexts}>
            <View style={styles.titleTexts}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.originalTitleText}>{originalTitle}</Text>
            </View>
            <Text
              style={styles.releaseDateText}>{`개봉일: ${releaseDate}`}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addToCalendarButton}
          onPress={async () => {
            try {
              await CalendarModule.createCalendarEvent(
                moment(releaseDate).valueOf() / 1000,
                title,
              );
              Alert.alert('캘린더 등록이 완료 되었습니다.');
            } catch (error: any) {
              Alert.alert(error.message);
            }
          }}>
          <Text style={styles.addToCalendarButtonText}>캘린더에 추가하기</Text>
        </TouchableOpacity>
        {hasReminder(`${movie.id}`) ? null : (
        <TouchableOpacity 
        style={styles.addToCalendarButton} 
        onPress={async () => {
          try{
            await addReminder(movie.id, movie.releaseDate, movie.title);
            Alert.alert('알림 등록이 완료되었습니다.');
          } catch (error: any){
            Alert.alert(error.message);
          }
        }}>
          <Text style={styles.addToCalendarButtonText}>알림 추가하기</Text>
        </TouchableOpacity>
        )}
        <Section title="소개">
          <Text style={styles.overviewText}>{overview}</Text>
        </Section>
        {director != null && (
          <Section title="감독">
            <People
              name={director.name}
              description={director.job}
              photoUrl={director.profileUrl ?? undefined}
            />
          </Section>
        )}
        <Section title="배우">
          <FlatList
            horizontal
            data={casts}
            renderItem={({ item: cast }) => {
              return (
                <People
                  name={cast.name}
                  description={cast.character}
                  photoUrl={cast.profileUrl ?? undefined}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsHorizontalScrollIndicator={false}
          />
        </Section>
        <Section title="관련 영상">
          {youTubeVideos.map((video, index) => {
            return (
              <React.Fragment key={video.id}>
                <YouTubeVideo title={video.name} youTubeKey={video.key} />
                {index + 1 < youTubeVideos.length && (
                  <View style={styles.verticalSeparator} />
                )}
              </React.Fragment>
            );
          })}
        </Section>
      </ScrollView>
    );
  }, [movie, addReminder, hasReminder]);

  return (
    <Screen>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        renderMovie()
      )}
    </Screen>
  );
};

export default DetailScreen;