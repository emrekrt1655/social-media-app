import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      userId: 'user1',
      userName: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('password1', 12), // Hash the password using bcrypt
      name: 'User 1',
      surname: 'Lastname',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      userId: 'user2',
      userName: 'user2',
      email: 'user2@example.com',
      password: await bcrypt.hash('password2', 12), // Hash the password using bcrypt
      name: 'User 2',
      surname: 'Lastname',
    },
  });
  // Create topics
  const topic1 = await prisma.topic.create({
    data: {
      topicId: 'topic1',
      text: 'Topic 1',
      topicUserId: user1.userId,
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      topicId: 'topic2',
      text: 'Topic 2',
      topicUserId: user2.userId,
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      postId: 'post1',
      text: 'Post 1',
      postUserId: user1.userId,
      postTopicId: topic1.topicId,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      postId: 'post2',
      text: 'Post 2',
      postUserId: user2.userId,
      postTopicId: topic2.topicId,
    },
  });

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      commentId: 'comment1',
      text: 'Comment 1',
      commentPostId: post1.postId,
      commentUserId: user1.userId,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      commentId: 'comment2',
      text: 'Comment 2',
      commentPostId: post2.postId,
      commentUserId: user2.userId,
    },
  });

  // Create likes
  const like1 = await prisma.like.create({
    data: {
      likeId: 'like1',
      likePostId: post1.postId,
      likeUserId: user2.userId,
    },
  });

  const like2 = await prisma.like.create({
    data: {
      likeId: 'like2',
      likeCommentId: comment2.commentId,
      likeUserId: user1.userId,
    },
  });

  // Create followers
  const follower1 = await prisma.follower.create({
    data: {
      folId: 'follower1',
      followerId: user1.userId,
      followedId: user2.userId,
    },
  });

  const follower2 = await prisma.follower.create({
    data: {
      folId: 'follower2',
      followerId: user2.userId,
      followedId: user1.userId,
    },
  });

  console.log('Seed data created successfully!');
}

seed().catch((error) => {
  console.error(error);
}).finally(() => {
  prisma.$disconnect();
});


