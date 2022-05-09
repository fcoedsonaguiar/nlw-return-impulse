import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const senMailFeedbackSpy = jest.fn();

describe('Submit Feedback', () => {
    it('Deve enviar um feedback', async () => {
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            { create: createFeedbackSpy },
            { sendMail: senMailFeedbackSpy }
        )
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            feedbackContent: 'Sou um teste',
            screenshot: 'test.png',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(senMailFeedbackSpy).toHaveBeenCalled();
    });
} )
