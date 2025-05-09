import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import { 
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import axios from 'axios';

const TestimonialsPage = () => {
  const [state, setState] = useState({
    testimonials: [],
    loading: true,
    error: null,
    openDialog: false,
    currentTestimonial: null
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await axios.get('http://localhost:5000/api/testimonials/all');
  
      if (!response.data?.success) {
        throw new Error('Неверный формат ответа от сервера');
      }
  
      setState(prev => ({
        ...prev,
        testimonials: response.data.data || [],
        loading: false
      }));
      
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message,
        loading: false
      }));
    }
  };

  const handleApproveTestimonial = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.patch(`${API_URL}/admin/testimonials/${id}`, { approve: true });
      fetchData();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const handleRejectTestimonial = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.patch(`${API_URL}/admin/testimonials/${id}`, { approve: false });
      fetchData();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${API_URL}/testimonials/${id}`);
      fetchData();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const handleOpenDialog = (testimonial) => {
    setState(prev => ({
      ...prev,
      openDialog: true,
      currentTestimonial: testimonial
    }));
  };

  const handleCloseDialog = () => {
    setState(prev => ({
      ...prev,
      openDialog: false,
      currentTestimonial: null
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Фильтрация отзывов по статусу
  const unapprovedTestimonials = state.testimonials.filter(t => t.is_approved === null || t.is_approved === undefined);
  const approvedTestimonials = state.testimonials.filter(t => t.is_approved === true);
  const rejectedTestimonials = state.testimonials.filter(t => t.is_approved === false);

  if (state.loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (state.error) return (
    <Box p={3}>
      <Alert severity="error">
        Ошибка: {state.error}
        <Button onClick={fetchData} sx={{ ml: 2 }}>Повторить</Button>
      </Alert>
    </Box>
  );

  const renderTestimonialTable = (testimonials, title, status) => {
    if (testimonials.length === 0) {
      if (status === 'unapproved') {
        return (
          <Box mt={4} mb={4}>
            <Alert severity="success" icon={false}>
              Все отзывы проверены! Новых отзывов нет.
            </Alert>
          </Box>
        );
      }
      return null;
    }

    return (
      <Box mt={4} mb={4}>
        <Typography variant="h6" gutterBottom>
          {title} <Chip label={testimonials.length} size="small" />
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
                <TableCell>Курс</TableCell>
                <TableCell>Пользователь</TableCell>
                <TableCell>Комментарий</TableCell>
                <TableCell>Рейтинг</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials.map(testimonial => (
                <TableRow key={testimonial.id}>
                  <TableCell>{testimonial.course?.title || 'Неизвестный курс'}</TableCell>
                  <TableCell>
                    {testimonial.application?.surname} {testimonial.application?.name}
                  </TableCell>
                  <TableCell>
                    <Box 
                      sx={{ 
                        maxWidth: 300, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleOpenDialog(testimonial)}
                    >
                      {testimonial.comment}
                    </Box>
                  </TableCell>
                  <TableCell>{testimonial.rating}/5</TableCell>
                  <TableCell>
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {testimonial.is_approved === true && (
                      <Chip label="Одобрен" color="success" size="small" icon={<VisibilityIcon />} />
                    )}
                    {testimonial.is_approved === false && (
                      <Chip label="Отклонен" color="error" size="small" icon={<VisibilityOffIcon />} />
                    )}
                    {(testimonial.is_approved === null || testimonial.is_approved === undefined) && (
                      <Chip label="На проверке" color="warning" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {(testimonial.is_approved === null || testimonial.is_approved === undefined) ? (
                      <>
                        <IconButton 
                          onClick={() => handleApproveTestimonial(testimonial.id)}
                          color="success"
                          title="Одобрить"
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleRejectTestimonial(testimonial.id)}
                          color="error"
                          title="Отклонить"
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : null}
                    <IconButton 
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      color="error"
                      title="Удалить"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Управление отзывами</Typography>
      
      {renderTestimonialTable(unapprovedTestimonials, "Непроверенные отзывы", "unapproved")}
      
      <Divider />
      
      {renderTestimonialTable(approvedTestimonials, "Одобренные отзывы", "approved")}
      
      <Divider />
      
      {renderTestimonialTable(rejectedTestimonials, "Отклоненные отзывы", "rejected")}

      {/* Диалог для просмотра полного комментария */}
      <Dialog
        open={state.openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Отзыв от {state.currentTestimonial?.application?.surname} {state.currentTestimonial?.application?.name}
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="subtitle1">Курс:</Typography>
            <Typography>{state.currentTestimonial?.course?.title || 'Неизвестный курс'}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Рейтинг:</Typography>
            <Typography>{state.currentTestimonial?.rating}/5</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Дата:</Typography>
            <Typography>
              {state.currentTestimonial?.created_at 
                ? new Date(state.currentTestimonial.created_at).toLocaleString() 
                : 'Неизвестно'}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Статус:</Typography>
            <Typography>
              {state.currentTestimonial?.is_approved === true && "Одобрен"}
              {state.currentTestimonial?.is_approved === false && "Отклонен"}
              {(state.currentTestimonial?.is_approved === null || state.currentTestimonial?.is_approved === undefined) && "На проверке"}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Комментарий:</Typography>
            <Typography style={{ whiteSpace: 'pre-line' }}>
              {state.currentTestimonial?.comment}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestimonialsPage;