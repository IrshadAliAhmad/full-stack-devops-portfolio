import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import transporter from "../config/mail.js";

import {
  createMessageService,
  getAllMessagesService,
  getMessageByIdService,
  markMessageAsReadService,
  deleteMessageService,
} from "../services/message.service.js";

/*
=========================================================
Message Controller
=========================================================
*/

/**
 * POST /api/contact
 * Public API
 */
export const createMessage = asyncHandler(async (req, res) => {
  console.log("REQUEST BODY:", req.body);

  // 1. Save to database
  const savedMessage = await createMessageService(req.body);

  // 2. Send email notification
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // email goes to you
    replyTo: req.body.email,
    subject: `🚀 New Portfolio Contact: ${req.body.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color:#2563eb;">New Contact Message Received</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Subject:</strong> ${req.body.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${req.body.message}</p>
        <hr />
        <p style="color:#6b7280;font-size:12px;">
          Sent from your DevOps Portfolio Contact Form
        </p>
      </div>
    `,
  });

  // 3. Response
  res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", savedMessage));
});

/**
 * GET /api/admin/messages
 */
export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await getAllMessagesService();

  res
    .status(200)
    .json(new ApiResponse(200, "Messages fetched successfully", messages));
});

/**
 * GET /api/admin/messages/:id
 */
export const getMessageById = asyncHandler(async (req, res) => {
  const message = await getMessageByIdService(req.params.id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Message fetched successfully", message));
});

/**
 * PATCH /api/admin/messages/:id/read
 */
export const markMessageAsRead = asyncHandler(async (req, res) => {
  const message = await markMessageAsReadService(req.params.id);

  res.status(200).json(new ApiResponse(200, "Message marked as read", message));
});

//  DELETE /api/admin/messages/:id

export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await deleteMessageService(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Message deleted successfully", message));
});
