import React, { useEffect, useState } from 'react';

type Props = {
  onFilterAll: () => void;
  onFilterActive: () => void;
  onFilterCompleted: () => void;
  onFilterByTitle: (query: string) => void;
};

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  onFilterAll,
  onFilterActive,
  onFilterCompleted,
  onFilterByTitle,
}) => {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setQuery(newQuery);
  }

  function clearInput() {
    setQuery('');
  }

  useEffect(() => {
    if (filterStatus === FilterStatus.All) {
      onFilterAll();
    } else if (filterStatus === FilterStatus.Active) {
      onFilterActive();
    } else if (filterStatus === FilterStatus.Completed) {
      onFilterCompleted();
    }

    if (query !== '') {
      onFilterByTitle(query);
    }
  }, [
    query,
    filterStatus,
    onFilterAll,
    onFilterActive,
    onFilterCompleted,
    onFilterByTitle,
  ]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={event => setFilterStatus(event.target.value)}
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
          {query.length > 0 && (
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
