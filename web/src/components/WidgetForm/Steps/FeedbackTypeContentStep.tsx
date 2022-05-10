import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../../libs/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenShotButton";
import { FeedbackType, feedbackTypes } from "../ToggleWidget";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    actionButtonToBack: () => void;
    feedbackContentSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    actionButtonToBack,
    feedbackContentSent }: FeedbackContentStepProps) {

    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenShot, setScreenshot] = useState<string | null>(null);
    const [feedbackContent, setFeedbackContent] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            screenshot: screenShot,
            feedbackContent,    
        });
        feedbackContentSent()
    }

    return (
        <>
            <header>

                <button
                    onClick={actionButtonToBack}
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" title="Voltar ao formulário de feedback">
                    <ArrowLeft weight="bold" className="h-4 w-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-1">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />

            </header>

            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    onChange={event => setFeedbackContent(event.target.value)}
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-500 text-zinc-100 focus:border-brand-300 bg-transparent rounded-md focus:outline-none focus:ring-brand-500 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo">
                </textarea>
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenShot={screenShot}
                        onScreenShotTook={setScreenshot}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md4 border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:transition-none disabled:opacity-50 disabled:bg-brand-300"
                        disabled={feedbackContent.length == 0 || isSendingFeedback}
                    >
                        { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
                    </button>
                </footer>
            </form>
        </>
    );
}