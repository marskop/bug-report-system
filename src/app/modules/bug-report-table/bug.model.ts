import { Comment } from "./../bug-report-table/comment.model";

export interface Bug {
  
  title: string;
  description: string;
  priority: string;
  reporter: string;
  status: string;
  dateUpdated: string;
  dateCreated: string;
  comments: Comment[];
}
