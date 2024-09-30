import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../types";

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    addAnswer(
      state,
      action: PayloadAction<{
        questionId: number;
        answer: Question["answers"][0];
      }>
    ) {
      const { questionId, answer } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);
      if (question) {
        question.answers.push(answer);
      }
    },
  },
});

export const { setQuestions, addAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;
