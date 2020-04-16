import { validateYupSchema } from "formik";
import { schema } from "./schema";


describe('aorb exercise', function () {

  it('requires sentences', async () => {
    const value = { text: null, image: null, exercise: { type: 'aorb' } };

    const resultPromise = validateYupSchema(value, schema)

    await expect(resultPromise).rejects.toThrow('exercise.sentences is a required field');
  });

  it('requires the correct choice', async () => {
    const value = {
      text: null,
      image: null,
      exercise: { type: 'aorb', sentences: [{ textBefore: 'How ', choice: { a: 'is', b: 'are' }, textAfter: ' you?' }] }
    };

    const resultPromise = validateYupSchema(value, schema)

    await expect(resultPromise).rejects.toThrow('exercise.sentences[0].choice.correct is a required field');
  });

  it('does not require text after the choice', async () => {
    const value = {
      text: null,
      image: null,
      exercise: { type: 'aorb', sentences: [{ textBefore: 'How ', choice: { a: 'is', b: 'are', correct: 'a' } }] }
    };

    const resultPromise = validateYupSchema(value, schema)

    await expect(resultPromise).resolves.not.toBeNull();
  });
});