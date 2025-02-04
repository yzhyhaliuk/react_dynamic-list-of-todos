import React, { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  onFilterAll: () => void;
  onFilterActive: () => void;
  onFilterCompleted: () => void;
  onFilterByTitle: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterAll,
  onFilterActive,
  onFilterCompleted,
  onFilterByTitle,
}) => {
  const [isQuery, setIsQuery] = useState(false);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value;

    setFilterStatus(status);

    switch (status) {
      case 'all':
        onFilterAll();
        break;

      case 'active':
        onFilterActive();
        break;

      case 'completed':
        onFilterCompleted();
        break;

      default:
        break;
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setQuery(newQuery);
    onFilterByTitle(newQuery.toLowerCase());
    setIsQuery(newQuery.length > 0);
  }

  function clearInput() {
    setQuery('');
    setIsQuery(false);
    onFilterByTitle('');
  }

  useEffect(() => {
    if (!query) {
      switch (filterStatus) {
        case 'all':
          onFilterAll();
          break;
        case 'active':
          onFilterActive();
          break;
        case 'completed':
          onFilterCompleted();
          break;
        default:
          break;
      }
    }
  }, [query, filterStatus, onFilterActive, onFilterAll, onFilterCompleted]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={handleTitleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {isQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
