import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';

const PostScreen = ({ route, post, user, fetchPost }) => {
  const { postId } = route.params;

  useEffect(() => {
    fetchPost(postId);
  }, [fetchPost, postId]);

  return (
    <ScrollView style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{post.title}</Title>
          <Paragraph style={styles.username}>By: {post.username}</Paragraph>
          <Paragraph style={styles.body}>{post.body}</Paragraph>
        </Card.Content>
        <Card.Content>
          <Title style={styles.commentTitle}>Comments</Title>
          {post.comments ? (
            post.comments.map((comment) => (
              <Card key={comment.id} style={styles.commentCard}>
                <Card.Content>
                  <Title style={styles.commentSubject}>{comment.subject}</Title>
                  <Paragraph style={styles.commentBody}>{comment.body}</Paragraph>
                  <Paragraph style={styles.commentEmail}>Email: {comment.email}</Paragraph>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text>No comments available</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Light Blue
    padding: 16,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // White
    margin: 8,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#4285F4', // Blue
    marginBottom: 16,
  },
  body: {
    marginBottom: 16,
    fontSize: 18,
    color: '#555555', // Dark Grey
    lineHeight: 24,
  },
  commentTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#4285F4', // Blue
  },
  commentCard: {
    marginBottom: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  commentSubject: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4285F4',
  },
  commentBody: {
    marginBottom: 8,
    color: '#333',
    lineHeight: 20,
  },
  commentEmail: {
    color: '#4285F4',
  },
});

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.user,
});

export default connect(mapStateToProps, { fetchPost })(PostScreen);