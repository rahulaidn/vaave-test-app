import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts, fetchUser, fetchPost, search } from '../actions';
import { Card, Title, Paragraph } from 'react-native-paper';

const PostsListScreen = ({ navigation, posts, loading, fetchPosts, fetchUser, fetchPost, search }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (text) => {
    setSearchQuery(text);
    search(text);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  const filteredPosts = posts.filter((post) => {
    const lowerCasedQuery = searchQuery.toLowerCase();
    const lowerCasedTitle = post.title?.toLowerCase() || '';
    const lowerCasedUsername = post.username?.toLowerCase() || ''; // Include username in the search

    return lowerCasedTitle.includes(lowerCasedQuery) || lowerCasedUsername.includes(lowerCasedQuery);
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or username"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostPress(item.id)}>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>{item.title}</Title>
                <TouchableOpacity onPress={() => handleUserPress(item.userId)}>
                  <Paragraph style={styles.username}>By: {item.username}</Paragraph>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  username: {
    color: '#4285F4',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  posts: state.posts,
  loading: state.loading,
});

export default connect(mapStateToProps, { fetchPosts, fetchUser, fetchPost, search })(PostsListScreen);
