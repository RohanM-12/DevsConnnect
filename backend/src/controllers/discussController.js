import prisma from "../db/db.config.js";
export const getChatRoomsList = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const chatRoomsList = await prisma.chatRoom.findMany({
      where: {
        members: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
      include: {
        post: {
          select: {
            id: true,
            name: true,
            thumbnailImgURL: true,
          },
        },
        members: {
          where: {
            userId: parseInt(userId),
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                collegeName: true,
              },
            },
          },
        },
      },
    });
    console.log("chatRoom List", chatRoomsList);
    res.json({
      status: 200,
      message: "Success",
      data: chatRoomsList,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error while getting chats , server error",
      error: error.message,
    });
  }
};
