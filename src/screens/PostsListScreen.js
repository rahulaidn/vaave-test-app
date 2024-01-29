import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts, fetchUser, fetchPost } from '../actions';
import { Card, Title, Paragraph } from 'react-native-paper';

const PostsListScreen = ({ navigation, posts, fetchPosts, fetchUser, fetchPost }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostPress = (postId) => {
    fetchPost(postId);
    navigation.navigate('Post', { postId });
  };

  const handleUserPress = (userId) => {
    fetchUser(userId);
    navigation.navigate('User', { userId });
  };

  return (
    <FlatList
      style={styles.container}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => handlePostPress(item.id)}>
          <Card.Content>
            <Title style={styles.title}>{item.title}</Title>
            <TouchableOpacity onPress={() => handleUserPress(item.userId)}>
            <Paragraph style={styles.username}>By: {item.username || 'Unknown User'}</Paragraph>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  username: {
    color: '#4285F4',
    fontSize:16,
    marginTop:4
  },
});

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { fetchPosts, fetchUser, fetchPost })(PostsListScreen);
