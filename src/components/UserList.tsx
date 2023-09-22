import { ChangeEvent, useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import {
  setAgeFilter,
  setError,
  setLimit,
  setLoading,
  setNameFilter,
  setOffset,
  setUsers,
} from "../redux/slice/userSlice";
import { requestUsers, requestUsersWithError } from "../api";

import { useSelector } from "react-redux";
import styles from "./index.module.scss";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, nameFilter, ageFilter, limit, offset } =
    useSelector((state: RootState) => state.users);

  const handleNameFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(event.target.value));
  };

  const handleAgeFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAgeFilter(event.target.value));
  };

  const handleChangePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(event.target.value)));
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - limit));
    }
  };

  const handleNextPage = () => {
    dispatch(setOffset(offset + limit));
  };

  const formattingCurrentPage = () => {
    return Math.floor(offset / limit);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const query = {
      name: nameFilter,
      age: ageFilter,
      limit,
      offset,
    };

    requestUsers(query)
      .then((data) => {
        dispatch(setUsers(data));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        requestUsersWithError()
          .then(() => {})
          .catch(() => {
            dispatch(setError(err));
            dispatch(setLoading(false));
          });
      });
  }, [dispatch, nameFilter, ageFilter, limit, offset]);
  return (
    <div className={styles.container}>
      <h1>User List</h1>
      <div className={styles.inputContainer}>
        <input
          value={nameFilter}
          onChange={(event) => handleNameFilterInput(event)}
          className={styles.inputField}
          type="text"
          placeholder="Name"
        />
        <input
          value={ageFilter}
          onChange={(event) => handleAgeFilterInput(event)}
          className={styles.inputField}
          type="text"
          placeholder="Age"
        />
      </div>
      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.userList}>
          {users.length === 0 ? (
            <p>Users not found</p>
          ) : (
            users.map((user, id) => (
              <li key={user.id}>
                {id + 1}) {user.name}, {user.age}
              </li>
            ))
          )}
        </ul>
      )}
      <div className={styles.paginationContainer}>
        <label>На странице:</label>
        <select
          value={limit}
          onChange={(event) => handleChangePagination(event)}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
        <div className={styles.pages}>
          <button onClick={handlePrevPage} className={styles.pageButton}>
            prev
          </button>
          <p className={styles.pageLabel}>page: {formattingCurrentPage()}</p>
          <button onClick={handleNextPage} className={styles.pageButton}>
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
