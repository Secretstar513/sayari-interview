import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, TextField } from '@mui/material';
import { addAnswer } from '../api/questionsAPI'; 

interface AddAnswerFormProps {
  questionId: number;
}

const AddAnswerForm = ({ questionId }: AddAnswerFormProps) => {
  const [answerBody, setAnswerBody] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(() => addAnswer(questionId, { body: answerBody, score: 0, user: { id: 1, name: 'John Doe' }, accepted: false, comments: [] }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['question']);
      setAnswerBody(''); 
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (answerBody.trim()) {
      mutation.mutate();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <TextField
        label="Your Answer"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={answerBody}
        onChange={(e) => setAnswerBody(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Add Answer
      </Button>
    </Box>
  );
};

export default AddAnswerForm;
