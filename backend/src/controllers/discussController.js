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

export const sendMessage = async (req, res) => {
  try {
    const { chatRoomId, senderId, content } = req.body;
    console.log(req.body);
    const msgSent = await prisma.message.create({
      data: {
        chatRoomId: parseInt(chatRoomId),
        senderId: parseInt(senderId),
        content: content,
      },
    });
    res.json({
      status: 200,
      message: "Sucess",
      msgSent,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error in sedning message , server Error",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await prisma.message.findMany({
      where: {
        chatRoomId: chatRoomId,
      },
    });
    res.json({
      status: 200,
      message: "success",
      messages,
    });
  } catch (error) {
    res.json({
      status: 200,
      message: "Error in getting messages , internal server error",
      error: error.message,
    });
  }
};