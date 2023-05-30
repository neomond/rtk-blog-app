import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {BlogItems} from '../models';
import {getById} from '../redux/slices/blogSlice';
import {AppDispatch} from '../redux/store';
import {getTimeAgo} from '../utils';
import {addSavedItem, removeSavedItem} from '../redux/slices/saveSlice';

const BlogItemDetailScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const [detail, setDetail] = useState<any>();
  const [isSavedItem, setIsSavedItem] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useSelector((state: BlogItems) => state.blogSlice);
  const savedItems: any = useSelector(
    (state: any) => state.saveItemsSlice.savedItems,
  );
  useEffect(() => {
    dispatch(getById(id)).then(action => {
      if (action.payload) {
        setDetail(action.payload);
        setIsSavedItem(
          savedItems.some((item: any) => item.id === action.payload.id),
        );
      }
    });
  }, [dispatch, id, savedItems]);

  const handleToggleSavedItem = () => {
    if (isSavedItem) {
      dispatch(removeSavedItem(detail.id));
      setIsSavedItem(false);
    } else {
      const isItemAlreadySaved = savedItems.some(
        (item: any) => item.id === detail.id,
      );
      if (!isItemAlreadySaved) {
        dispatch(addSavedItem(detail));
        setIsSavedItem(true);
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.lightContainer,
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
        <TouchableOpacity>
          <Ionicons
            name="create"
            size={20}
            color={theme === 'dark' ? '#A059F1' : '#FE4962'}
          />
        </TouchableOpacity>
      </View>
      {detail && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: detail.avatar}} style={styles?.avatar} />
          <View style={styles.bookmark}>
            <TouchableOpacity onPress={handleToggleSavedItem}>
              <Ionicons
                name={isSavedItem ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={theme === 'dark' ? '#A059F1' : '#FE4962'}
              />
            </TouchableOpacity>
          </View>
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
  },
  lightContainer: {
    backgroundColor: '#fff',
    flex: 1,
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
    marginBottom: 10,
  },
  detInfo: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  editLine: {
    flexDirection: 'row',
  },
  bookmark: {
    position: 'absolute',
    top: 75,
    right: 45,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#000',
    padding: 5,
  },
});
