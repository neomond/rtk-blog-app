import React from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {BlogItems} from '../models';
import {getTimeAgo} from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppDispatch} from '../redux/store';
import {removeSavedItem} from '../redux/slices/saveSlice';

const LikedScreen = () => {
  const {loading, theme} = useSelector((state: BlogItems) => state.blogSlice);
  const savedItems: any = useSelector(
    (state: any) => state.saveItemsSlice.savedItems,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromSavedItems = (id: string) => {
    dispatch(removeSavedItem(id));
  };

  if (savedItems.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.lightContainer,
          theme === 'dark' && styles.darkContainer,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text style={[styles.header, theme === 'dark' && {color: '#e3e3e3'}]}>
          No Saved Items.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.lightContainer, theme === 'dark' && styles.darkContainer]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Text style={[styles.header, theme === 'dark' && {color: '#e3e3e3'}]}>
        Saved Items:
      </Text>
      {loading === 'pending' ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshing={false}
          data={savedItems}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}: any) => (
            <View
              style={{
                alignItems: 'center',
                marginBottom: 50,
              }}>
              <Image source={{uri: item.avatar}} style={styles?.avatar} />
              <TouchableOpacity
                style={styles.bookmark}
                onPress={() => handleRemoveFromSavedItems(item.id)}>
                <Ionicons
                  name={'bookmark'}
                  size={20}
                  color={theme === 'dark' ? '#A059F1' : '#FE4962'}
                />
              </TouchableOpacity>
              <View style={styles.detInfo}>
                <Text
                  style={[
                    styles.title,
                    theme === 'dark' && {color: '#CEC7C9'},
                  ]}>
                  {item?.title}
                </Text>

                <Text style={styles.createdAt}>
                  {getTimeAgo(new Date(item.createdAt))}
                </Text>
                <Text
                  style={[
                    styles.description,
                    theme === 'dark' && {color: '#CEC7C9'},
                  ]}>
                  {item?.description}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default LikedScreen;

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  darkContainer: {
    backgroundColor: '#151517',
  },
  avatar: {
    width: '90%',
    height: 150,
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
    top: 10,
    right: 45,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#000',
    padding: 5,
  },
});
