export interface FeedbackCreateData {
    type: string
    feedbackContent: string
    screenshot?: string
}

export interface FeedbackRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}