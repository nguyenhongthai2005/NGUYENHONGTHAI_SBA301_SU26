import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { ACTIONS, initialState, orchidReducer } from '../reducers/orchidReducer';
import { getAllOrchids, createOrchid, updateOrchid, deleteOrchid } from '../utils/orchidApi';

const OrchidContext = createContext(null);

export const OrchidProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orchidReducer, initialState);

  const fetchOrchids = useCallback(async () => {
    dispatch({ type: ACTIONS.FETCH_START });
    try {
      const data = await getAllOrchids();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ 
        type: ACTIONS.FETCH_ERROR, 
        payload: error?.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu' 
      });
    }
  }, []);

  const addOrchid = useCallback(async (orchidData) => {
    // Note: Assuming addOrchid doesn't handle loading state directly, or it could
    // but the reducer currently only has ADD action. We'll just return the promise.
    const newOrchid = await createOrchid(orchidData);
    dispatch({ type: ACTIONS.ADD, payload: newOrchid });
    return newOrchid;
  }, []);

  const editOrchid = useCallback(async (id, orchidData) => {
    const updated = await updateOrchid(id, orchidData);
    dispatch({ type: ACTIONS.UPDATE, payload: updated });
    return updated;
  }, []);

  const removeOrchid = useCallback(async (id) => {
    await deleteOrchid(id);
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, []);

  const value = {
    ...state,
    fetchOrchids,
    addOrchid,
    editOrchid,
    removeOrchid,
  };

  return (
    <OrchidContext.Provider value={value}>
      {children}
    </OrchidContext.Provider>
  );
};

export const useOrchid = () => {
  const context = useContext(OrchidContext);
  if (!context) {
    throw new Error('useOrchid must be used within an OrchidProvider');
  }
  return context;
};
