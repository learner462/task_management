import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    if (token) fetchTasks();
  }, [token]);

  return (
    <div>
      <h2>Your Tasks</h2>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
