import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  console.log('Clearing old data...');
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.follower.deleteMany();
  await prisma.user.deleteMany();

  const plainUsers = [
    { userName: 'ayse_tech', email: 'ayse@example.com', name: 'Ayşe', surname: 'Yılmaz', password: 'password1' },
    { userName: 'mert.dev', email: 'mert@example.com', name: 'Mert', surname: 'Kaya', password: 'password2' },
    { userName: 'elif_mindful', email: 'elif@example.com', name: 'Elif', surname: 'Demir', password: 'password3' },
    { userName: 'emre.travel', email: 'emre@example.com', name: 'Emre', surname: 'Şahin', password: 'password4' },
    { userName: 'zeynep.ai', email: 'zeynep@example.com', name: 'Zeynep', surname: 'Aydın', password: 'password5' },
  ];

  const users = [];

  console.log('Creating users...');
  for (const u of plainUsers) {
    const user = await prisma.user.create({
      data: {
        userId: u.userName,
        userName: u.userName,
        email: u.email,
        name: u.name,
        surname: u.surname,
        password: await bcrypt.hash(u.password, 10),
      },
    });
    users.push(user);
  }

  const topicsData = [
    { text: 'Yapay Zeka ve Toplum', user: 'zeynep.ai' },
    { text: 'Frontend Geliştirme İpuçları', user: 'mert.dev' },
    { text: 'Zihinsel Sağlık Üzerine', user: 'elif_mindful' },
    { text: 'Avrupa’da Interrail Deneyimi', user: 'emre.travel' },
    { text: 'Kadınların Teknolojideki Yeri', user: 'ayse_tech' },
  ];

  const topics = [];

  console.log('Creating topics...');
  for (const topicData of topicsData) {
    const user = users.find((u) => u.userId === topicData.user)!;
    const topic = await prisma.topic.create({
      data: {
        topicId: `${user.userId}-${topicData.text.replace(/\s+/g, '-')}`,
        text: topicData.text,
        topicUserId: user.userId,
      },
    });
    topics.push(topic);
  }

  const posts = [];

  console.log('Creating posts...');
  for (const topic of topics) {
    const postUser = users.find((u) => u.userId === topic.topicUserId)!;

    const samplePosts = [
      `Bugün ${topic.text.toLowerCase()} hakkında çok ilginç bir makale okudum.`,
      `Sence ${topic.text.toLowerCase()} gelecekte nasıl etkiler yaratacak?`,
      `Bu konu hakkında çok düşündüm, özellikle son gelişmeler ışığında.`,
    ];

    for (let i = 0; i < samplePosts.length; i++) {
      const post = await prisma.post.create({
        data: {
          postId: `${topic.topicId}-post${i + 1}`,
          text: samplePosts[i],
          postUserId: postUser.userId,
          postTopicId: topic.topicId,
          image: "",
        },
      });
      posts.push(post);
    }
  }

  const commentSamples = [
    "Çok haklısın!",
    "Ben de buna benzer bir şey yaşamıştım.",
    "Bence bu konuda daha fazla araştırma yapılmalı.",
    "Bu çok düşündürücü bir yazı olmuş.",
    "Eline sağlık, harika yazmışsın!",
  ];

  console.log('Creating comments and likes...');
  for (const post of posts) {
    const commenter = users[Math.floor(Math.random() * users.length)];
    const commentText = commentSamples[Math.floor(Math.random() * commentSamples.length)];

    await prisma.comment.create({
      data: {
        commentId: `comment-${post.postId}`,
        text: commentText,
        commentPostId: post.postId,
        commentUserId: commenter.userId,
      },
    });

    const liker = users[Math.floor(Math.random() * users.length)];

    await prisma.like.create({
      data: {
        likeId: `like-${post.postId}-${liker.userId}`,
        likePostId: post.postId,
        likeUserId: liker.userId,
      },
    });
  }

  const followRelations: [string, string][] = [
    ['ayse_tech', 'zeynep.ai'],
    ['mert.dev', 'ayse_tech'],
    ['elif_mindful', 'emre.travel'],
    ['zeynep.ai', 'mert.dev'],
    ['emre.travel', 'zeynep.ai'],
  ];

  console.log('Creating follower relations...');
  for (const [followerId, followedId] of followRelations) {
    await prisma.follower.create({
      data: {
        folId: `f-${followerId}-${followedId}`,
        followerId,
        followedId,
      },
    });
  }

  console.log('🌱 Seed completed successfully!');
}

seed()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
