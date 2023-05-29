import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getTimeAgo} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {deleteBlog} from '../redux/slices/blogSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlogItems} from '../models';

const BlogItemDetailScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const [detail, setDetail] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: number) => {
    dispatch(deleteBlog(id));
  };
  const {theme} = useSelector((state: BlogItems) => state.blogSlice);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`,
        );
        setDetail(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark' && {backgroundColor: '#151517'},
      ]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        <View>
          <Ionicons
            name="arrow-back"
            size={20}
            color={theme === 'dark' ? '#A059F1' : '#FE4962'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <Ionicons
            name="trash"
            size={20}
            color={'tomato'}
            onPress={() => handleDelete(detail.id)}
          />
        </View>
      </View>
      {detail && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: detail.avatar}} style={styles?.avatar} />
          <View style={styles.detInfo}>
            <Text
              style={[styles.title, theme === 'dark' && {color: '#CEC7C9'}]}>
              {detail?.title}
            </Text>

            <Text style={styles.createdAt}>
              {getTimeAgo(new Date(detail.createdAt))}
            </Text>
            <Text
              style={[
                styles.description,
                theme === 'dark' && {color: '#CEC7C9'},
              ]}>
              {detail?.description}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BlogItemDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  avatar: {
    width: '85%',
    height: '40%',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  createdAt: {
    fontSize: 14,
    color: '#666',
  },
  detInfo: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
