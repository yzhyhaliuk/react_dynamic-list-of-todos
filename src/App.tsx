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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos().then(todosFromServer => {
      setAllTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
      setTodos(todosFromServer);
      setLoading(false);
    });
  }, []);

  const handleFilterAll = useCallback(() => {
    setTodos(allTodos);
    setFilteredTodos(allTodos);
  }, [allTodos]);

  const handleFilterActive = useCallback(() => {
    const activeTodos = allTodos.filter(todo => !todo.completed);

    setFilteredTodos(activeTodos);
    setTodos(activeTodos);
  }, [allTodos]);

  const handleFilterComplete = useCallback(() => {
    const completedTodos = allTodos.filter(todo => todo.completed);

    setFilteredTodos(completedTodos);
    setTodos(completedTodos);
  }, [allTodos]);

  const filterByTitle = useCallback(
    (query: string) => {
      setTodos(
        filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    },
    [filteredTodos],
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
