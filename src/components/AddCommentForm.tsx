import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, TextField } from '@mui/material';
import { addComment } from '../api/questionsAPI'; 

interface AddCommentFormProps {
  parentId: number; 
  parentType: 'answer' | 'comment';
}

const AddCommentForm = ({ parentId, parentType }: AddCommentFormProps) => {
  const [commentBody, setCommentBody] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(() => addComment(parentId, parentType, { body: commentBody }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['question']);
      setCommentBody(''); 
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentBody.trim()) {
      mutation.mutate();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <TextField
        label="Your Comment"
        variant="outlined"
        multiline
        rows={2}
        fullWidth
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ marginTop: 1 }}>
        Add Comment
      </Button>
    </Box>
  );
};

export default AddCommentForm;
