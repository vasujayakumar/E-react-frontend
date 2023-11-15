// DoctorTasksList.jsx
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const DoctorTasksList = ({ doctorId }) => {
  // Example tasks data
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Follow up with patient John Doe', completed: false },
    { id: 2, text: 'Review lab results for Jane Smith', completed: false },
    // Add more tasks here
  ]);

  // Handle checkbox toggle
  const handleToggle = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} dense>
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              disableRipple
              onChange={() => handleToggle(task.id)}
            />
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DoctorTasksList;
