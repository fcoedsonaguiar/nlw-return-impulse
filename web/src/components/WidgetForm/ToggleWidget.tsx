import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackTypeContentStep";

import bugImageUrl from '../../images/bug.svg';
import ideaImageUrl from '../../images/idea.svg';
import thoughtImageUrl from '../../images/thought.svg';
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";


export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        },
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        },
    },
    THOUGHT: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem'
        },
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function ToggleWidget() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackContentSent, setFeedbackContentSent] = useState(false);

    function actionButtonToBack() {
        setFeedbackContentSent(false)
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 relative p-4 rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            { feedbackContentSent ? (
                <FeedbackSucessStep actionButtonToBack={actionButtonToBack} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackChangeStep={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            actionButtonToBack={actionButtonToBack}
                            feedbackContentSent={() => setFeedbackContentSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com amor pela <a href="#" className="underline underline-offset-2">Rocketseat!</a>
            </footer>
        </div>
    )
}