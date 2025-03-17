import { create } from 'zustand';
interface StoreState {
  selection: string[];
  setSelection: (updater: (current: string[]) => string[]) => void;
}

const useSelectionStore = create<StoreState>()((set) => ({
  selection: ['PB-002'],
  setSelection: (updater) => set((state) => ({
    selection: updater(state.selection)
  }))
}));

// Usage with data from external source
const data = [{ id: 'PB-001' }];
const setSelection = useSelectionStore.getState().setSelection;

// Call with functional update
setSelection((current) => 
  current.length === data.length 
    ? [] 
    : data.map((item) => item.id)
);


export default useSelectionStore;

