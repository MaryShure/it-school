// admin/NewsletterPage.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const NewsletterPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });
  const [newsletters, setNewsletters] = useState([]);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newsletter/send",
        formData
      );
      setStatus(response.data.message);
      setFormData({ subject: "", content: "" });
      fetchNewsletters();
    } catch (error) {
      setStatus(error.response?.data?.error || "Ошибка отправки");
    }
  };

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/newsletter");
      setNewsletters(response.data.data);
    } catch (error) {
      console.error("Ошибка загрузки рассылок:", error);
    }
  };

  React.useEffect(() => {
    fetchNewsletters();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Управление рассылкой
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Создать новую рассылку
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Тема письма"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Содержание письма"
            name="content"
            value={formData.content}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={6}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Отправить рассылку
          </Button>
        </form>
        {status && <Typography sx={{ mt: 2 }}>{status}</Typography>}
      </Paper>

      <Typography variant="h6" gutterBottom>
        История рассылок
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Тема</TableCell>
              <TableCell>Получатели</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsletters.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.sent_at
                    ? new Date(item.sent_at).toLocaleString()
                    : "Не отправлено"}
                </TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.recipients_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NewsletterPage;
