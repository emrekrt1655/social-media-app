import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
    await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.follower.deleteMany();
  await prisma.user.deleteMany();
  const userCount = 10;
  const topicsPerUser = 5;
  const postsPerTopic = 10;

  const users = [];

  // USERS
  for (let i = 1; i <= userCount; i++) {
    const user = await prisma.user.create({
      data: {
        userId: `user${i}`,
        userName: `user${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash(`password${i}`, 10),
        name: `Name${i}`,
        surname: `Surname${i}`,
      },
    });
    users.push(user);
  }

  const topics = [];

  // TOPICS
  for (const user of users) {
    for (let t = 1; t <= topicsPerUser; t++) {
      const topic = await prisma.topic.create({
        data: {
          topicId: `${user.userId}-topic${t}`,
          text: `Interesting Topic ${t} by ${user.userName}`,
          topicUserId: user.userId,
        },
      });
      topics.push(topic);
    }
  }

  const posts = [];

  // POSTS
  for (const topic of topics) {
    const topicOwner = users.find((u) => u.userId === topic.topicUserId);
    for (let p = 1; p <= postsPerTopic; p++) {
      const post = await prisma.post.create({
        data: {
          postId: `${topic.topicId}-post${p}`,
          text: `This is post ${p} in ${topic.text}`,
          postUserId: topicOwner!.userId,
          postTopicId: topic.topicId,
          image: "",
        },
      });
      posts.push(post);
    }
  }

  const comments = [];
  const likes = [];

  // COMMENTS & LIKES
  for (const post of posts) {
    // Yorum yazan random user seç
    const randomCommentUser = users[Math.floor(Math.random() * users.length)];
    const comment = await prisma.comment.create({
      data: {
        commentId: `comment-${post.postId}`,
        text: `Comment on ${post.text}`,
        commentPostId: post.postId,
        commentUserId: randomCommentUser.userId,
      },
    });
    comments.push(comment);

    // Like atan random user seç
    const randomLikeUser = users[Math.floor(Math.random() * users.length)];
    const like = await prisma.like.create({
      data: {
        likeId: `like-${post.postId}`,
        likePostId: post.postId,
        likeUserId: randomLikeUser.userId,
      },
    });
    likes.push(like);
  }

  // FOLLOWERS
  for (const follower of users) {
    const otherUsers = users.filter((u) => u.userId !== follower.userId);
    const followingSample = otherUsers.slice(0, 3); // Herkes 3 kişiyi takip etsin

    for (const followed of followingSample) {
      await prisma.follower.create({
        data: {
          folId: `f-${follower.userId}-${followed.userId}`,
          followerId: follower.userId,
          followedId: followed.userId,
        },
      });
    }
  }

  console.log("Seed completed successfully!");
}

seed()
  .catch((e) => {
    console.error("Error during seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
