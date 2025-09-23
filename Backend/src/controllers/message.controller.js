import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/Cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSlidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //$ne stands for not equal to
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSlidebar controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const UserToChatId = req.params.id;
    const MyId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: MyId, receiverId: UserToChatId },
        { senderId: UserToChatId, receiverId: MyId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    let imageUrl;
    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image);
      imageUrl = uploadResult.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(
      {
        message: "message sent successfully",
      },
      newMessage
    );
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "internal server error he" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.body;
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
