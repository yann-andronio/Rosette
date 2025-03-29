import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import activeLinkReducer from './slice/activeLinkSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['activeName']
}

const persistedActiveLinkReducer = persistReducer(persistConfig, activeLinkReducer)

const Store = configureStore({
  reducer: {
    activeLink : persistedActiveLinkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'] // amin redux vaovao ty efa tsy par defaut fa apaitaka karahan jo
      }
    })
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export const persistor = persistStore(Store)
export default Store
