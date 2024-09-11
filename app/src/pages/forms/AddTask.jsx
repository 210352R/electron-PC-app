import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TodoForm = () => {
  const ipcRenderer = window.ipcRenderer;
  const [todos, setTodos] = useState([]);
  console.log(todos);

  // Validation schema for the form
  const validationSchema = Yup.object({
    task: Yup.string()
      .min(3, 'Task should be at least 3 characters')
      .required('Task is required'),
  });

  const addTodo = (values, { resetForm }) => {
    setTodos([...todos, values.task]); // Add task to the todo list
    resetForm(); // Reset form after submission
  };

  // handle submit
  const handleSubmit = () => {
    console.log('submitting tasks');
    ipcRenderer.send('submit-tasks', todos);
    console.log('tasks submitted');
    setTodos([]); // Clear the todo list
  };

  return (
    <div>
      <h2>Add a Task</h2>
      <Formik
        initialValues={{ task: '' }}
        validationSchema={validationSchema}
        onSubmit={addTodo}
      >
        <Form>
          <div>
            <label htmlFor="task">Task: </label>
            <Field name="task" type="text" placeholder="Enter a task" />
            <ErrorMessage
              name="task"
              component="div"
              style={{ color: 'red' }}
            />
          </div>
          <button type="submit">Add Task</button>
        </Form>
      </Formik>
      <button type="submit" onClick={handleSubmit}>
        Submit Tasks
      </button>

      <h3>Todo List:</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm;
