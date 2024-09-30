import { Question, Answer, Comment } from "../types";
import data from "../data/stackoverfaux.json";

let questions: Question[] = data;

export const fetchQuestions = async (): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questions);
    }, 500);
  });
};

export const fetchQuestionById = async (
  id: number
): Promise<Question | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questions.find((q) => q.id === id));
    }, 500);
  });
};

export const fetchAnswerById = async (
  answerId: number
): Promise<Answer | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const answer = questions
        .flatMap((q) => q.answers)
        .find((a) => a.id === answerId);
      resolve(answer);
    }, 500);
  });
};

export const fetchCommentById = async (
  commentId: number
): Promise<Comment | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comment = questions
        .flatMap((q) => [
          ...q.comments,
          ...q.answers.flatMap((a) => a.comments),
        ])
        .find((c) => c.id === commentId);
      resolve(comment);
    }, 500);
  });
};

export const addComment = async (
  parentId: number,
  parentType: "answer" | "comment",
  newComment: { body: string }
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now(), 
        body: newComment.body,
        user: { id: 1, name: "John Doe" }, 
      };

      if (parentType === "answer") {
        questions = questions.map((question) => {
          question.answers = question.answers.map((answer) => {
            if (answer.id === parentId) {
              answer.comments.push(comment);
            }
            return answer;
          });
          return question;
        });
      } else if (parentType === "comment") {
        questions = questions.map((question) => {
          if (question.id === parentId) {
            question.comments.push(comment);
          }

          return question;
        });
      }

      resolve();
    }, 500);
  });
};

export const addAnswer = async (
  questionId: number,
  answer: Omit<Answer, "id">
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      questions = questions.map((question) => {
        if (question.id === questionId) {
          question.answers.push({ ...answer, id: Date.now() });
        }
        return question;
      });
      resolve();
    }, 500);
  });
};

export const deleteUser = async (userId: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      questions = questions.filter((q) => q.user.id !== userId);
      resolve();
    }, 500);
  });
};
