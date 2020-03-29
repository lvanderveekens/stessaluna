import React, { FunctionComponent, useState } from "react";
import { AorbSentence as AorbSentenceInterface } from '../aorb-exercise.interface'
import AorbExercise from "./AorbExercise";
import axios from "../../../http/client";

interface Props {
    id: number
    sentences: AorbSentenceInterface[]
}

const AorbExerciseContainer: FunctionComponent<Props> = ({ id, sentences }) => { 

    const [choices, setChoices] = useState(new Array(sentences.length).fill(null));

    const handleChoice = (index: number) => (choice: 'a' | 'b') => {
        setChoices(choices.map((c, i) => i == index ? choice : c))
    };

    const handleSubmit = () => {
        axios.post(`/api/exercises/${id}/answers`, {})
            .then(res => {
                console.log(res.data);
            })
            .catch((error) => { console.log(error); });
    }

    return (
        <AorbExercise sentences={sentences} choices={choices} onChoice={handleChoice} onSubmit={handleSubmit} />
    )

}

export default AorbExerciseContainer;