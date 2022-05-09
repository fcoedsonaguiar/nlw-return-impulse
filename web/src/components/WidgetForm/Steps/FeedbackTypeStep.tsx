import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "../ToggleWidget";

interface FeedbackTypeStepProps {
    onFeedbackChangeStep: (type: FeedbackType) => void;
}

export function FeedbackTypeStep(props: FeedbackTypeStepProps) {

    return (
        <>
            <header>
                <span className="text-xl leading-6">Deixe seu comentário</span>
                <CloseButton />
            </header>

            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button
                            key={key}
                            onClick={() => props.onFeedbackChangeStep(key as FeedbackType)}
                            className="rounded-lg bg-zinc-800 py-5 w-24 flex flex-1 flex-col gap-2 items-center border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 focus:outline-none"
                            type="button">
                            <img src={value.image.source} alt={value.image.alt} />
                            <span>{value.title}</span>
                        </button>
                    )
                })}
            </div>
        </>
    )
}