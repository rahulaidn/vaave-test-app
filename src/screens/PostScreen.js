import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Card, Title, Paragraph } from 'react-native-paper';

const PostScreen = ({ route, post, fetchPost }) => {
  const { postId } = route.params;

  useEffect(() => {
    fetchPost(postId);
  }, [fetchPost, postId]);

  console.log(post.username, "username", postId)

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Title style={styles.title}>{post.title}</Title>
        <Paragraph style={styles.username}>By: {post.username || 'Unknown User'}</Paragraph>
      </Card.Content>
      <Card.Content>
        <Title style={styles.commentTitle}>Comments</Title>
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.commentCard}>
              <Card.Content>
                <Title style={styles.commentSubject}>{item.subject}</Title>
                <Paragraph style={styles.commentBody}>{item.body}</Paragraph>
                <Paragraph style={styles.commentEmail}>Email: {item.email}</Paragraph>
              </Card.Content>
            </Card>
          )}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
  },
  username: {
    color: '#4285F4',
    marginBottom: 16,
  },
  commentTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333',
  },
  commentCard: {
    marginBottom: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    elevation: 2,
  },
  commentSubject: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4285F4',
  },
  commentBody: {
    marginBottom: 8,
    color: '#333',
  },
  commentEmail: {
    color: '#4285F4',
  },
});

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { fetchPost })(PostScreen);
