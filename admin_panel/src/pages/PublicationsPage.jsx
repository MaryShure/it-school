import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
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
  DialogActions,
  DialogContent,
  IconButton,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Publish as PublishIcon,
  Unpublished as UnpublishedIcon
} from '@mui/icons-material';
import axios from 'axios';
import PublicationForm from './PublicationForm';

const PublicationsPage = () => {
  const [state, setState] = useState({
    publications: [],
    loading: true,
    error: null,
    openDialog: false,
    dialogMode: 'create',
    currentPublication: null,
    publicationType: 'all'
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await axios.get('http://localhost:5000/api/publications');
  
      if (!response.data?.success) {
        throw new Error('Неверный формат ответа от сервера');
      }
  
      setState(prev => ({
        ...prev,
        publications: response.data.data || [],
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

  const handleOpenCreateDialog = () => {
    setState(prev => ({
      ...prev,
      openDialog: true,
      dialogMode: 'create',
      currentPublication: null
    }));
  };

  const handleOpenEditDialog = (publication) => {
    setState(prev => ({
      ...prev,
      openDialog: true,
      dialogMode: 'edit',
      currentPublication: publication
    }));
  };

  const handleCloseDialog = () => {
    setState(prev => ({
      ...prev,
      openDialog: false,
      currentPublication: null
    }));
  };

  const handleDeletePublication = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${API_URL}/publications/${id}`);
      fetchData();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.patch(`${API_URL}/publications/${id}`, {
        is_published: !isPublished,
        published_at: isPublished ? null : new Date().toISOString()
      });
      fetchData();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      let response;
  
      if (state.dialogMode === 'edit') {
        response = await axios.put(
          `${API_URL}/publications/${state.currentPublication.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/publications`, 
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
  
      if (response.data.success) {
        fetchData();
        handleCloseDialog();
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || err.message
      }));
    }
  };

  const filteredPublications = state.publications.filter(pub => {
    if (state.publicationType === 'all') return true;
    return pub.type === state.publicationType;
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>Управление публикациями</Typography>
        
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Тип публикации</InputLabel>
            <Select
              value={state.publicationType}
              onChange={(e) => setState(prev => ({ ...prev, publicationType: e.target.value }))}
              label="Тип публикации"
            >
              <MenuItem value="all">Все типы</MenuItem>
              <MenuItem value="news">Новости</MenuItem>
              <MenuItem value="event">Анонсы мероприятий</MenuItem>
              <MenuItem value="featured">Выпуск месяца</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
          >
            Добавить публикацию
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Заголовок</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Дата события</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата публикации</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPublications.length > 0 ? (
              filteredPublications.map(publication => (
                <TableRow key={publication.id}>
                  <TableCell>{publication.title}</TableCell>
                  <TableCell>
                    {publication.type === 'news' && <Chip label="Новость" color="primary" />}
                    {publication.type === 'event' && <Chip label="Анонс" color="secondary" />}
                    {publication.type === 'featured' && <Chip label="Выпуск" color="success" />}
                  </TableCell>
                  <TableCell>
                    {publication.event_date ? new Date(publication.event_date).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={publication.is_published ? 'Опубликовано' : 'Черновик'} 
                      color={publication.is_published ? 'success' : 'default'} 
                    />
                  </TableCell>
                  <TableCell>
                    {publication.published_at ? new Date(publication.published_at).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      onClick={() => handleTogglePublish(publication.id, publication.is_published)}
                      color={publication.is_published ? 'success' : 'default'}
                      title={publication.is_published ? 'Снять с публикации' : 'Опубликовать'}
                    >
                      {publication.is_published ? <UnpublishedIcon /> : <PublishIcon />}
                    </IconButton>
                    <IconButton 
                      onClick={() => handleOpenEditDialog(publication)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeletePublication(publication.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Публикации не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={state.openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {state.dialogMode === 'edit' ? 'Редактирование публикации' : 'Создание новой публикации'}
        </DialogTitle>
        <DialogContent>
          <PublicationForm
            publication={state.currentPublication}
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            mode={state.dialogMode}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PublicationsPage;