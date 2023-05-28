import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BlogItemDetailScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const [detail, setDetail] = useState<any>();

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
    <View style={styles.container}>
      {detail && (
        <>
          <Image source={{uri: detail.avatar}} style={styles?.avatar} />
          <View style={styles.detInfo}>
            <Text style={styles.title}>{detail?.title}</Text>
            <Text style={styles.description}>{detail?.description}</Text>
            <Text style={styles.createdAt}>
              Created At: {detail?.createdAt}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default BlogItemDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
