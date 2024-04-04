import { type Timestamp } from "firebase/firestore";

export type Poll = {
  id: string;
  title: string;
  date_created: Timestamp;
  private: boolean;
  multiple: boolean;
  comment: boolean;
};

export type Option = {
  id: string;
  name: string;
  image: string;
  // pollId: string;
};