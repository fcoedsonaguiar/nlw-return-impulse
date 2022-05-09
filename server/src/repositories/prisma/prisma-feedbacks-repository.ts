import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create({type, feedbackContent, screenshot}: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                feedbackContent,
                screenshot,
            }
        })
    };
}