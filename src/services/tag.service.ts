import prisma from '../../prisma/prisma-client';

const getTags = async (username?: string): Promise<string[]> => {
  const whereCondition = username
    ? {
        articles: {
          some: {
            author: {
              username,
            },
          },
        },
      }
    : {
        articles: {
          some: {},
        },
      };

  const tags = await prisma.tag.groupBy({
    where: whereCondition,
    by: ['name'],
    orderBy: {
      _count: {
        name: 'desc',
      },
    },
    take: 10,
  });

  return tags.map(tag => tag.name);
};

export default getTags;
