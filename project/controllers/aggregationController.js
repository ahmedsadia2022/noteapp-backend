const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');

const groupUsersByInterests = async (req, res) => {
  try {
    
    const groupedUsers = await User.aggregate([
      // unwind the interests array
      { $unwind: "$interests" },
      
      // group by the interest string
      {
        $group: {
          _id: "$interests", 
          users: { $push: "$username" },
          count: { $sum: 1 } 
        }
      },
      
      // sort alphabetically by interest
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json(groupedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userPosts = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      
      {
        $lookup: {
          from: "posts", // collection name in MongoDB
          localField: "_id", // field in the User collection
          foreignField: "userId",// field in the Post collection
          as: "posts"// name of the output array
        }
      },
      
      {
        $project: {
          username: 1,
          posts: 1
        }
      }
    ]);

    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userPosts[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { groupUsersByInterests, getUserPosts };