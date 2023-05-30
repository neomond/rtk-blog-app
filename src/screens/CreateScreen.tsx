import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createItemBlog} from '../redux/slices/blogSlice';
import {AppDispatch} from '../redux/store';
import {BlogItems} from '../models';

const CreateScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useSelector((state: BlogItems) => state.blogSlice);

  const handleCreateBlog = () => {
    const blogData = {
      title,
      description,
    };
    setTitle('');
    setDescription('');
    dispatch(createItemBlog(blogData));
  };

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' && {backgroundColor: '#151517'},
      ]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Text style={[styles.title, theme === 'dark' && {color: '#fff'}]}>
        Create Blog
      </Text>

      <TextInput
        style={[styles.input, theme === 'dark' && {color: '#aaa'}]}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
      />

      <TextInput
        style={[styles.input, theme === 'dark' && {color: '#aaa'}]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            theme === 'dark' && {backgroundColor: '#A059F1'},
          ]}
          onPress={handleCreateBlog}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  createButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#FE4962',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
