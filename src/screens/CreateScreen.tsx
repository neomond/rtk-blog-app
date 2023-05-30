import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createItemBlog, updateItemBlog} from '../redux/slices/blogSlice';
import {AppDispatch} from '../redux/store';

const CreateScreen = ({route}: any) => {
  const {id} = route.params;
  const [title, setTitle] = useState(id ? route.params.title : '');
  const [description, setDescription] = useState(
    id ? route.params.description : '',
  );
  const dispatch = useDispatch<AppDispatch>();
  const {theme, data} = useSelector((state: any) => state.blogSlice);

  useEffect(() => {
    if (id) {
      const item = data.find((item: any) => item.id === id);
      if (item) {
        setTitle(item.title);
        setDescription(item.description);
      }
    }
  }, [data, id]);

  const handleUpdateBlog = () => {
    const blogData = {
      title,
      description,
    };
    if (id) {
      dispatch(updateItemBlog({id, blogData}));
    } else {
      dispatch(createItemBlog(blogData));
    }
    setTitle('');
    setDescription('');
  };

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' && {backgroundColor: '#151517'},
      ]}>
      <Text style={[styles.title, theme === 'dark' && {color: '#fff'}]}>
        {id ? 'Edit Blog' : 'Create Blog'}
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
          onPress={handleUpdateBlog}>
          <Text style={styles.buttonText}>{id ? 'Update' : 'Create'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#FE4962',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateScreen;
