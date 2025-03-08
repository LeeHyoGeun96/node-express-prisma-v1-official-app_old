import prisma from '../../prisma/prisma-client';

const getTags = async (username?: string): Promise<string[]> => {
  if (username) {
    // 1. 로그인한 사용자의 태그 (최대 3개)
    const userTags = await prisma.tag.findMany({
      where: {
        articles: {
          some: {
            author: {
              username,
            },
          },
        },
      },
      select: { name: true },
      orderBy: {
        articles: {
          _count: 'desc',
        },
      },
      take: 3,
    });

    // 2. 나머지 태그들 (이미 가져온 태그 제외)
    const otherTags = await prisma.tag.findMany({
      where: {
        name: {
          notIn: userTags.map(tag => tag.name),
        },
        articles: {
          some: {},
        },
      },
      select: { name: true },
      orderBy: {
        articles: {
          _count: 'desc',
        },
      },
      take: 10 - userTags.length,
    });

    return [...userTags, ...otherTags].map(tag => tag.name);
  }

  // 비로그인 시 기존 로직
  const tags = await prisma.tag.findMany({
    where: {
      articles: {
        some: {},
      },
    },
    select: { name: true },
    orderBy: {
      articles: {
        _count: 'desc',
      },
    },
    take: 10,
  });

  return tags.map(tag => tag.name);
};

export default getTags;
