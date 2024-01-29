import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';

const UserScreen = ({ route, user, fetchUser }) => {
  const { userId } = route.params;

  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  return (
    <View style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Cover source={{ uri: 'https://i.pravatar.cc/400' }} style={styles.cardCover} />
        <Card.Content>
          <View style={styles.userInfo}>
            <Avatar.Image size={100} source={{ uri: 'https://i.pravatar.cc/150' }} />
          </View>
          <Paragraph style={styles.detail}>Full Name: {user.username}</Paragraph>
          <Paragraph style={styles.detail}>Email: {user.email}</Paragraph>
          <Paragraph style={styles.detail}>Website: {user.website}</Paragraph>
          <Paragraph style={styles.detail}>Company Details: Vaave Pvt Ltd</Paragraph>
        </Card.Content>
      </Card>
    </View>
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
  },
  cardCover: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -50,
    marginLeft: 16,
  },
  username: {
    fontSize: 24,
    marginLeft: 16,
    color: '#3498DB', // Blue
  },
  detail: {
    marginBottom: 8,
    marginLeft: 16,
    fontSize: 16,
    color: '#555555', // Dark Grey
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { fetchUser })(UserScreen);
