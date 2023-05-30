import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {BlogItems} from '../models';
import {
  deleteBlog,
  getAllItemsBlog,
  setSearchQuery,
  toggleDarkMode,
} from '../redux/slices/blogSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getTimeAgo} from '../utils';

const BlogScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, data, theme, searchQuery} = useSelector(
    (state: BlogItems) => state.blogSlice,
  );

  const handleDelete = (id: number) => {
    dispatch(deleteBlog(id));
  };

  const goToDetail = (id: number): any => {
    navigation.navigate('BlogDetails', {id: id});
  };
  const refresh = () => {
    dispatch(getAllItemsBlog());
  };

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const filteredData = data.filter((blog: any) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    dispatch(getAllItemsBlog());
  }, [dispatch]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          theme === 'dark' && {backgroundColor: '#151517'},
        ]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          theme === 'dark' && {backgroundColor: '#151517'},
        ]}>
        <Text style={[{fontSize: 18}, theme === 'dark' && {color: '#e3e3e3'}]}>
          Error: {error}
        </Text>
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
      <TextInput
        style={[styles.input, theme === 'dark' && {color: '#aaa'}]}
        value={searchQuery}
        onChangeText={query => dispatch(setSearchQuery(query))}
        placeholder="Search..."
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
      />
      {loading === 'pending' ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            refreshing={false}
            onRefresh={refresh}
            data={filteredData}
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
                  <View>
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
                  <View>
                    <Ionicons
                      name="trash"
                      size={20}
                      color={'#FE4962'}
                      onPress={() => handleDelete(item.id)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  input: {
    // width: '100%',
    height: 40,
    borderColor: '#666',
    borderWidth: 0.8,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginHorizontal: 15,
  },
});
