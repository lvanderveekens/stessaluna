import React, { FunctionComponent, useState } from "react";
import { AorbSentence as AorbSentenceInterface } from '../aorb-exercise.interface'
import AorbExercise from "./AorbExercise";
import axios from "../../../http/client";

interface Props {
    id: number
    sentences: AorbSentenceInterface[]
}

const AorbExerciseContainer: FunctionComponent<Props> = ({ id, sentences }) => { 

    const [choices, setChoices] = useState(new Array(sentences.length).fill(null) as ('a' | 'b')[]);

    const handleChoice = (index: number) => (choice: 'a' | 'b') => {
        setChoices(choices.map((c, i) => i == index ? choice : c))
    };

    const handleSubmit = () => {
        // TODO: only allow submitting after filling in everything
        // TODO: use redux 
        
        axios.post(`/api/exercises/${id}/answers`, { type: 'aorb', choices })
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