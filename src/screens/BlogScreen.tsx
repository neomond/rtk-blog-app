import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {BlogItems} from '../models';
import {getAllItemsBlog} from '../redux/slices/blogSlice';

const BlogScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, data} = useSelector(
    (state: BlogItems) => state.blogSlice,
  );

  const goToDetail = (id: number): any => {
    navigation.navigate('BlogDetails', {id: id});
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
    <SafeAreaView>
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
                style={styles.postContainer}
                onPress={() => goToDetail(item.id)}>
                <Image source={{uri: item.avatar}} style={styles.avatar} />
                <View style={styles.postContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  {/* <Text style={styles.description}>{item.description}</Text> */}
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
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
