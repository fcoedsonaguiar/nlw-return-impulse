import express from 'express';
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodenailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "54509d2b16fabb",
      pass: "efc635b3d1f680"
    }
  });

routes.post('/feedbacks', async (req, res) => {
    const {type, feedbackContent, screenshot} = req.body;
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodenailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository, nodemailerMailAdapter
        );

    await submitFeedbackUseCase.execute({
        type,
        feedbackContent,
        screenshot,
    });
    return res.status(201).send();
})