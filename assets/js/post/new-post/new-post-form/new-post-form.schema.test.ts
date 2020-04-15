import { validateYupSchema } from "formik";
import { newPostFormSchema } from "./new-post-form.schema";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ValidationError } from 'yup';

test('all fields are null', async () => {
  const value = { text: null, image: null, exercise: null };

  const resultPromise = validateYupSchema(value, newPostFormSchema)

  await expect(resultPromise).resolves.not.toBeNull();
});

test('aorb exercise misses sentences', async () => {
  const value = { text: null, image: null, exercise: { type: 'aorb' } };

  const resultPromise = validateYupSchema(value, newPostFormSchema)

  await expect(resultPromise).rejects.toThrow('exercise.sentences is a required field');
});

test('aorb choice misses correct option', async () => {
  const value = {
    text: null,
    image: null,
    exercise: { type: 'aorb', sentences: [{ textBefore: 'How ', choice: { a: 'is', b: 'are' }, textAfter: ' you?' }] }
  };

  const resultPromise = validateYupSchema(value, newPostFormSchema)

  await expect(resultPromise).rejects.toThrow('exercise.sentences[0].choice.correct is a required field');
});