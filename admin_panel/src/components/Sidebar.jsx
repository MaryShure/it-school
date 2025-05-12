import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';

const Sidebar = () => {
  return (
    <div style={{ width: 250 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/applications">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Заявки" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/courses">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Курсы" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/testimonials">
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="Отзывы" />
          </ListItemButton>
        </ListItem>
          <ListItem disablePadding>
           <ListItemButton component={Link} to="/publications">
             <ListItemIcon>
              <ArticleIcon />
             </ListItemIcon>
           <ListItemText primary="Публикации" />
           </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        <ListItemButton component={Link} to="/about-admin">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="О компании" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        <ListItemButton component={Link} to="/letters">
          <ListItemIcon><EmailIcon /></ListItemIcon>
          <ListItemText primary="Управление рассылкой" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;