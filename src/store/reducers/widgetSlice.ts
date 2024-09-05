import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetsData } from '../../utils/constant';

interface Widget {
    id: string;
    name: string;
    text: string;
    selected: boolean;
}

interface WidgetsState {
    [key: string]: Widget[];
}

const initialState: WidgetsState = WidgetsData;

const widgetsSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        updateWidget(state, action: PayloadAction<{ category: string; id: string; selected: boolean }>) {
            const { category, id, selected } = action.payload;
            state[category] = state[category].map(widget =>
                widget.id === id ? { ...widget, selected } : widget
            );
        },
        addWidget(state, action: PayloadAction<{ category: string; widget: Widget }>) {
            const { category, widget } = action.payload;
            state[category].push(widget);
        },
    },
});

export const { updateWidget, addWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
