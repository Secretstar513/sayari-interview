import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useLocation } from 'react-router-dom';
import { fetchQuestionById } from '../api/questionsAPI';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import ContentBody from './ContentBody';
import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
import AddAnswerForm from './AddAnswerForm';

const QuestionDetail: React.FC = () => {
  const { id, answerId, commentId } = useParams<{ id: string; answerId?: string; commentId?: string }>();
  const { data: question, isLoading } = useQuery(['question', id], () => fetchQuestionById(Number(id)));
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const commentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const location = useLocation();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (answerId && answerRefs.current[Number(answerId)]) {
      answerRefs.current[Number(answerId)]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (commentId && commentRefs.current[Number(commentId)]) {
      commentRefs.current[Number(commentId)]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [answerId, commentId, question]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!question) {
    return <Typography variant="h6">Question not found</Typography>;
  }

  const handleCopyLink = (type: 'comment' | 'answer', id: number) => {
    let url = '';
    if (type === 'comment') {
      url = `${window.location.origin}${location.pathname}/comment/${id}`;
    } else if (type === 'answer') {
      url = `${window.location.origin}${location.pathname}/answer/${id}`;
    }

    navigator.clipboard.writeText(url).then(() => {
      setSnackbarMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} link copied to clipboard!`);
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <ContentBody content={question.title} />
          </Typography>
          <ContentBody content={question.body} />
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Comments:
      </Typography>
      <Box>
        {question.comments.map((comment) => (
          <Box
            key={comment.id}
            ref={(el: HTMLDivElement | null) => (commentRefs.current[comment.id] = el)}
            sx={{
              border: commentId === String(comment.id) ? '2px solid #1976d2' : '1px solid #e0e0e0',
              padding: 2,
              marginBottom: 2,
              borderRadius: 2,
              backgroundColor: commentId === String(comment.id) ? '#e3f2fd' : '#fff',
            }}
          >
            <ContentBody content={comment.body} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                By: {comment.user.name}
              </Typography>
              <Tooltip title="Copy link to this comment" arrow>
                <IconButton size="small" onClick={() => handleCopyLink('comment', comment.id)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        ))}
        <AddCommentForm parentId={question.id} parentType="comment" />
      </Box>

      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Answers:
      </Typography>
      {question.answers.map((answer) => (
        <Card
          key={answer.id}
          ref={(el) => (answerRefs.current[answer.id] = el)}
          sx={{
            marginTop: 2,
            border: answerId === String(answer.id) ? '2px solid #1976d2' : 'none',
            backgroundColor: answerId === String(answer.id) ? '#e3f2fd' : 'inherit',
          }}
        >
          <CardContent>
            <Typography variant="body1">
              <ContentBody content={answer.body} />
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Score: {answer.score} By: {answer.user.name}
              </Typography>
              <Tooltip title="Copy link to this answer" arrow>
                <IconButton size="small" onClick={() => handleCopyLink('answer', answer.id)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <CommentsList comments={answer.comments} />
            <AddCommentForm parentId={answer.id} parentType="answer" />
          </CardContent>
        </Card>
      ))}

      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Add an Answer:
      </Typography>
      <AddAnswerForm questionId={question.id} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default QuestionDetail;
