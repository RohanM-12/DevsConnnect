import prisma from "../db/db.config.js";

export const createPost = async (req, res) => {
  try {
    console.log(req.body.thumbnailImage);
    const {
      Title,
      Description,
      gitHubLink,
      deployedLink,
      demoVideoLink,
      technologiesUsed,
    } = req.body;
    let path = `${Date.now()}-${req?.body.thumbnailImage.name}`;
    const result = await prisma.posts.create({
      data: {
        name: Title,
        description: Description,
        gitHubLink: gitHubLink,
        deployedLink: deployedLink,
        demoVideoLink: demoVideoLink,
        technologiesUsed: technologiesUsed.toString(),
        thumbnailImgURL: path,
      },
    });
    if (result) {
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
    const postsData = await prisma.posts.findMany({});

    return res.json({ status: 200, message: "success", data: postsData });
  } catch (error) {
    return res.json({ status: 500, message: "Error fetching posts" });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id: pid } = req.params;

    const postData = await prisma.posts.findUnique({
      where: {
        id: parseInt(pid),
      },
    });

    return res.json({ status: 200, message: "success", data: postData });
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
    const result = await prisma.posts.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (result) {
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
    const userId = req.query.userID;
    const postId = parseInt(req.query.id);

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
    const userID = req.query.userID;
    const postID = parseInt(req.query.id);
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
    let updatedLikes = postToRemoveLike.likes;
    updatedLikes.filter((id) => id !== userID);
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
