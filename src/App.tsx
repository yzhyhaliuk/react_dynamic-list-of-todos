/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setLoading(true);
    getTodos().then(todosFromServer => {
      setAllTodos(todosFromServer);
      setTodos(todosFromServer);
      setLoading(false);
    });
  }, []);

  const handleFilterAll = useCallback(() => {
    setTodos(allTodos);
  }, [allTodos]);

  const handleFilterActive = useCallback(() => {
    setTodos(allTodos.filter(todo => !todo.completed));
  }, [allTodos]);

  const handleFilterComplete = useCallback(() => {
    setTodos(allTodos.filter(todo => todo.completed));
  }, [allTodos]);

  const filterByTitle = useCallback(
    (query: string) => {
      setTodos(
        todos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    },
    [todos],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterActive={handleFilterActive}
                onFilterAll={handleFilterAll}
                onFilterCompleted={handleFilterComplete}
                onFilterByTitle={filterByTitle}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <TodoModal id={selectedId} todos={todos} onClose={setSelectedId} />
      )}
    </>
  );
};
