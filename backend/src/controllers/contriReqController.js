import prisma from "../db/db.config.js";

export const createContributionRequest = async (req, res) => {
  try {
    console.log(req.body);

    const result = await prisma.contributionRequests.create({
      data: {
        requesterId: req.body.requesterId,
        postId: req.body.postId,
        status: req.body.status,
        interestDescription: req.body.interestDescription,
        wishesToWorkOn: req.body.wishesToWorkOn,
      },
    });

    res.json({
      status: 200,
      data: result,
      message: "success",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export const updateContributionRequestStatus = async (req, res) => {
  try {
    const { id, requesterId, postId, status } = req.body;

    const doesExist = await prisma.contributionRequests.findUnique({
      where: {
        id: id,
        requesterId: requesterId,
        postId: postId,
      },
    });
    if (!doesExist) {
      return res.json({
        status: 401,
        message: "Request not found for the post",
      });
    }

    const result = await prisma.contributionRequests.update({
      where: {
        id: id,
        requesterId: requesterId,
        postId: postId,
      },
      data: {
        status: status,
      },
    });
    return res.json({
      status: 200,
      message: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getContributionRequests = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },

      include: {
        posts: {
          orderBy: {
            created_at: "asc",
          },
          include: {
            contributionRequests: {
              include: {
                requester: {
                  select: {
                    name: true, // Only select the name field
                    collegeName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the contribution requests from the user's posts
    const contributionRequests = user.posts.flatMap((post) =>
      post.contributionRequests.map((request) => ({
        ...request,
        requesterName: request.requester.name,
        collegeName: request.requester.collegeName,
        postName: post.name,
      }))
    );
    // console.log(contributionRequests);
    res.json({ status: 200, message: "success", data: contributionRequests });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Internal server Error",
      error: error.message,
    });
  }
};
