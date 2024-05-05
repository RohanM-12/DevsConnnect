import prisma from "../db/db.config.js";

export const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const {
      Title,
      Description,
      gitHubLink,
      deployedLink,
      demoVideoLink,
      technologiesUsed,
      userId,
    } = req.body;
    console.log(req.file);

    const uploadResult = await prisma.posts.create({
      data: {
        name: Title,
        description: Description,
        gitHubLink: gitHubLink,
        deployedLink: deployedLink,
        demoVideoLink: demoVideoLink,
        technologiesUsed: technologiesUsed.toString(),
        thumbnailImgURL: "path",
        userId: parseInt(userId),
      },
    });
    if (uploadResult) {
      return res.json({ status: 200, message: "Post uploaded successfully" });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error while uploading post ",
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    console.log(req.query);
    // if (req?.query?.collage) {
    //   const postsData = await prisma.posts.findMany({
    //     where: {
    //       collage: req.query.userId,
    //     },
    //     orderBy: {
    //       created_at: "asc",
    //     },
    //     include: {
    //       user: {
    //         select: {
    //           name: true,
    //         },
    //       },
    //     },
    //   });
    //   return res.json({
    //     status: 200,
    //     message: "success",
    //     data: postsData,
    //   });
    // }

    if (req?.query?.userId) {
      const postsData = await prisma.posts.findMany({
        where: {
          userId: parseInt(req.query.userId),
        },
        orderBy: {
          created_at: "asc",
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });
      const moddifiedPostData = postsData?.map((post) => ({
        ...post,
        user: post.user.name,
      }));
      return res.json({
        status: 200,
        message: "success",
        data: moddifiedPostData,
      });
    }

    const postsData = await prisma.posts.findMany({
      orderBy: {
        created_at: "asc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const moddifiedPostData = postsData?.map((post) => ({
      ...post,
      user: post.user.name,
    }));

    return res.json({
      status: 200,
      message: "success",
      data: moddifiedPostData,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error fetching posts",
      error: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id: pid } = req.params;

    const postData = await prisma.posts.findUnique({
      where: {
        id: parseInt(pid),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.json({
      status: 200,
      message: "success",
      data: { ...postData, user: postData.user.name },
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error getting post",
      error: error,
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const resultPostDelete = await prisma.posts.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!resultPostDelete) {
      return res.json({ status: 401, message: "Post not found to delete" });
    }
    const resultDeleteRequestsAssociated =
      await prisma.contributionRequests.deleteMany({
        where: {
          postId: resultPostDelete.id,
        },
      });
    if (resultDeleteRequestsAssociated) {
      return res.json({
        status: 200,
        message: "Post Deleted",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error deleting post",
      error: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.userID.toString();
    const postId = parseInt(req.body.id);

    let postToLike = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });
    if (!postToLike) {
      return res.json({
        status: 404,
        message: "post not found",
      });
    }
    if (postToLike.likes.includes(userId)) {
      return res.json({
        status: "403",
        message: "post already liked",
      });
    }
    const updatedPost = await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        likes: [...postToLike.likes, userId],
      },
    });
    res.json({
      status: 200,
      message: "Post liked",
      likesCount: updatedPost.likes.length,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error while liking a post",
      error: error.message,
    });
  }
};

export const removeLikePost = async (req, res) => {
  try {
    const userID = req.body.userID.toString();
    const postID = parseInt(req.body.id);
    const postToRemoveLike = await prisma.posts.findUnique({
      where: {
        id: postID,
      },
    });

    if (!postToRemoveLike) {
      res.json({
        status: 404,
        message: "Post not Found",
      });
    }
    console.log(postToRemoveLike);
    let updatedLikes = postToRemoveLike?.likes?.filter((id) => id !== userID);
    console.log(updatedLikes);
    const updatedPost = await prisma.posts.update({
      where: {
        id: postID,
      },
      data: {
        likes: updatedLikes,
      },
    });
    res.json({
      status: 200,
      message: "like removed",
      likesCount: updatedPost.likes.length,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error while liking a post",
      error: error.message,
    });
  }
};
