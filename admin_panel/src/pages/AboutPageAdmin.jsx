import { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Checkbox, 
  IconButton, Alert, Snackbar
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

export default function AboutPageAdmin() {
  const [sections, setSections] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    section: '', 
    title: '', 
    content: '', 
    order_num: 0, 
    is_active: true 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchSections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/about?all=true');
      setSections(response.data.data);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки данных');
      console.error('Ошибка загрузки:', err);
    }
  };

  useEffect(() => { fetchSections(); }, []);

  const handleEdit = (section) => {
    setEditingId(section.id);
    setFormData({
      section: section.section,
      title: section.title || '',
      content: section.content,
      order_num: section.order_num,
      is_active: section.is_active === true // Явное приведение к boolean
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        id, 
        section: formData.section,
        title: formData.title,
        content: formData.content,
        order_num: formData.order_num,
        is_active: formData.is_active
      };
      
      await axios.post('http://localhost:5000/api/about', payload);
      
      setEditingId(null);
      setSuccess('Изменения успешно сохранены');
      fetchSections();
    } catch (err) {
      setError('Ошибка сохранения: ' + (err.response?.data?.error || err.message));
      console.error('Ошибка сохранения:', err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Редактирование страницы "О компании"</Typography>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Секция</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Контент</TableCell>
              <TableCell>Порядок</TableCell>
              <TableCell>Активна</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>
                  {editingId === section.id ? (
                    <TextField
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    section.section
                  )}
                </TableCell>
                <TableCell>
                  {editingId === section.id ? (
                    <TextField
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    section.title || '-'
                  )}
                </TableCell>
                <TableCell>
                  {editingId === section.id ? (
                    <TextField
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      multiline
                      rows={3}
                      fullWidth
                    />
                  ) : (
                    <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {section.content.replace(/<[^>]*>/g, '').substring(0, 50)}...
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === section.id ? (
                    <TextField
                      type="number"
                      value={formData.order_num}
                      onChange={(e) => setFormData({...formData, order_num: parseInt(e.target.value) || 0})}
                      size="small"
                    />
                  ) : (
                    section.order_num
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={editingId === section.id ? formData.is_active : section.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    disabled={editingId !== section.id}
                  />
                </TableCell>
                <TableCell align="right">
                  {editingId === section.id ? (
                    <>
                      <IconButton onClick={() => handleSave(section.id)} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="secondary">
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEdit(section)} color="primary">
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}