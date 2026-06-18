import { createContext, useReducer, useCallback, useContext } from 'react';
import { orchidReducer, initialState, ACTIONS } from '../reducers/orchidReducer';
import * as api from '../utils/orchidApi';

export const OrchidContext = createContext(null);

export const OrchidProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orchidReducer, initialState);

  const fetchOrchids = useCallback(async () => {
    dispatch({ type: ACTIONS.FETCH_START });
    try {
      const data = await api.getAllOrchids();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message || 'Lỗi khi tải dữ liệu' });
    }
  }, []);

  const addOrchid = useCallback(async (orchidData) => {
    const newOrchid = await api.createOrchid(orchidData);
    dispatch({ type: ACTIONS.ADD, payload: newOrchid });
  }, []);

  const editOrchid = useCallback(async (id, orchidData) => {
    const updatedOrchid = await api.updateOrchid(id, orchidData);
    dispatch({ type: ACTIONS.UPDATE, payload: updatedOrchid });
  }, []);

  const removeOrchid = useCallback(async (id) => {
    await api.deleteOrchid(id);
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, []);

  return (
    <OrchidContext.Provider
      value={{
        ...state,
        fetchOrchids,
        addOrchid,
        editOrchid,
        removeOrchid,
      }}
    >
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
