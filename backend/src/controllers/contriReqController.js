import prisma from "../db/db.config.js";

export const createContributionRequest = async (req, res) => {
  try {
    console.log(req.body);

    const result = await prisma.contributionRequests.create({
      data: {
        requesterId: req.body.requesterId,
        postId: req.body.postId,
        status: "requested",
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
