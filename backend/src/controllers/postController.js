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
    });
  }
};
