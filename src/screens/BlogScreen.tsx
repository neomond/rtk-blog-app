import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {BlogItems} from '../models';
import {getAllItemsBlog, toggleDarkMode} from '../redux/slices/blogSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getTimeAgo} from '../utils';

const BlogScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, data, theme} = useSelector(
    (state: BlogItems) => state.blogSlice,
  );

  const goToDetail = (id: number): any => {
    navigation.navigate('BlogDetails', {id: id});
  };

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    dispatch(getAllItemsBlog());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.lightContainer, theme === 'dark' && styles.darkContainer]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons
            name="sunny"
            size={22}
            color={theme === 'dark' ? '#A059F1' : '#FE4962'}
            onPress={() => handleToggle()}
          />
        </TouchableOpacity>
        <Text style={[{fontSize: 18}, theme === 'dark' && {color: '#e3e3e3'}]}>
          Welcome!
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="notifications"
            size={22}
            color={theme === 'dark' ? '#A059F1' : '#FE4962'}
          />
        </TouchableOpacity>
      </View>
      {loading === 'pending' ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            refreshing={false}
            data={data}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}: any) => (
              <TouchableOpacity
                style={[
                  styles.postContainer,
                  theme === 'dark' && {borderBottomColor: '#464646'},
                ]}
                onPress={() => goToDetail(item.id)}>
                <Image source={{uri: item.avatar}} style={styles.avatar} />
                <View style={styles.postContent}>
                  <Text
                    style={[
                      styles.title,
                      theme === 'dark' && {color: '#CEC7C9'},
                    ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.description}>
                    {getTimeAgo(new Date(item.createdAt))}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#151517',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  postContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
