export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  body: string;
  user: User;
}

export interface Answer {
  id: number;
  body: string;
  score: number;
  user: User;
  accepted: boolean;
  comments: Comment[];
}

export interface Question {
  id: number;
  title: string;
  body: string;
  score: number;
  user: User;
  comments: Comment[];
  answers: Answer[];
}
