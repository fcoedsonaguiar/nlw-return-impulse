import { MailAdapter } from "../adapters/email-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository"

export interface SubmitFeedbackUseCaseRequest {
    type: string
    feedbackContent: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    private _feedbackRepository;
    private _mailAdapter;

    constructor(
        feedbackRepository: FeedbackRepository,
        mailAdapter: MailAdapter,
    ) {
        this._feedbackRepository = feedbackRepository;
        this._mailAdapter = mailAdapter;
    }
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, feedbackContent, screenshot } = request;

        if(!type) {
            throw new Error('type is required.')
        }

        if(!feedbackContent) {
            throw new Error('type is required.');
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('invalid screenshot format.');
        }
        
        await this._feedbackRepository.create({
            type,
            feedbackContent,
            screenshot,
        })

        await this._mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="color: #111">`,
                `<p>Tipo do feedback: ${type} </p>`,
                `<p>Comentário: ${feedbackContent} </p>`,
                screenshot ? `<img src="${screenshot}"/>` : ``,
                `</div>`
            ].join('\n')
        })
    }
}