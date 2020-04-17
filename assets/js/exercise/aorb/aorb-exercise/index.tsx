import React, { FunctionComponent, useState } from "react";
import { AorbSentence as AorbSentenceInterface } from '../aorb.model';
import AorbExercise from "./AorbExercise";
import { connect } from 'react-redux';
import { submitAnswer } from '../../../store/post/actions';
import { SubmitAorbAnswerRequest } from '../../submit-answer/request.interface';

interface Props {
    id: number
    sentences: AorbSentenceInterface[]
    submitAnswer: (exerciseId: number, request: SubmitAorbAnswerRequest) => void
}

const AorbExerciseContainer: FunctionComponent<Props> = ({ id, sentences, submitAnswer }) => {

    const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ('a' | 'b')[]);

    const handleChoice = (index: number) => (choice: 'a' | 'b') => {
        setChoices(choices.map((c, i) => i == index ? choice : c))
    };

    const handleSubmit = () => {
        // TODO: only allow submitting after filling in everything
        submitAnswer(id, new SubmitAorbAnswerRequest(choices))
    }

    const submitDisabled = sentences.some(s => s.choice.answer !== null);

    return (
        <AorbExercise
            sentences={sentences}
            choices={choices}
            onChoice={handleChoice}
            onSubmit={handleSubmit}
            submitDisabled={submitDisabled}
        />
    )
}

const actionCreators = {
    submitAnswer,
}

export default connect(null, actionCreators)(AorbExerciseContainer);