import prisma from "../config/database.js";

/*
=========================================================
Message Repository
---------------------------------------------------------
Database operations for Contact Messages
Only Prisma queries should be written here.
=========================================================
*/

/**
 * Create a new contact message
 */
export const createMessage = async (data) => {
  return await prisma.message.create({
    data,
  });
};

/**
 * Get all messages
 * Newest message appears first
 */
export const getAllMessages = async () => {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get one message by ID
 */
export const getMessageById = async (id) => {
  return await prisma.message.findUnique({
    where: {
      id: Number(id),
    },
  });
};

/**
 * Mark message as Read
 */
export const markMessageAsRead = async (id) => {
  return await prisma.message.update({
    where: {
      id: Number(id),
    },
    data: {
      isRead: true,
    },
  });
};

/**
 * Delete message permanently
 */
export const deleteMessage = async (id) => {
  return await prisma.message.delete({
    where: {
      id: Number(id),
    },
  });
};