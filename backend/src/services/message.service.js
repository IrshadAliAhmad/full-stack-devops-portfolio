import {
  createMessage,
  getAllMessages,
  getMessageById,
  markMessageAsRead,
  deleteMessage,
} from "../repositories/message.repository.js";

/*
=========================================================
Message Service
=========================================================
*/

/**
 * Save a new contact message
 * Keep only latest 15 messages in database
 */
export const createMessageService = async (data) => {
  // Save new message
  const message = await createMessage(data);

  // Fetch all messages (newest first)
  const messages = await getAllMessages();

  // Delete old messages if more than 15 exist
  if (messages.length > 15) {
    const oldMessages = messages.slice(15);

    for (const msg of oldMessages) {
      await deleteMessage(msg.id);
    }
  }

  return message;
};

/**
 * Get all contact messages
 */
export const getAllMessagesService = async () => {
  return await getAllMessages();
};

/**
 * Get message by ID
 */
export const getMessageByIdService = async (id) => {
  return await getMessageById(id);
};

/**
 * Mark a message as read
 */
export const markMessageAsReadService = async (id) => {
  return await markMessageAsRead(id);
};

/**
 * Delete a message
 */
export const deleteMessageService = async (id) => {
  return await deleteMessage(id);
};