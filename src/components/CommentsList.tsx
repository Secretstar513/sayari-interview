import React from 'react';
import ContentBody from './ContentBody';
import { Comment } from '../types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <List>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={<ContentBody content={comment.body} />}
              secondary={`By: ${comment.user.name}`}
            />
          </ListItem>
          {index < comments.length - 1 && <Divider component="li" />}
        </div>
      ))}
    </List>
  );
};

export default CommentsList;
