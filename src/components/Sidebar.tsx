import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { updateWidget, addWidget } from "../store/reducers/widgetSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface Props {
  showSidebar: boolean;
  handleSidebar: () => void;
}

interface Widget {
  name: string;
  text: string;
  selected: boolean;
  id: string;
}

interface CategoryProps {
  widgets: Widget[];
  onWidgetChange: (widgetId: string, selected: boolean) => void;
}

const CategoryTab: React.FC<CategoryProps> = ({ widgets, onWidgetChange }) => {
  return (
    <Box>
      {widgets.map((widget) => (
        <FormControlLabel
          key={widget.id}
          control={
            <Checkbox
              checked={widget.selected}
              onChange={(e) => onWidgetChange(widget.id, e.target.checked)}
            />
          }
          label={widget.name}
        />
      ))}
    </Box>
  );
};

const Sidebar: React.FC<Props> = ({ showSidebar, handleSidebar }) => {
  const dispatch: AppDispatch = useDispatch();
  const widgetsFromStore = useSelector((state: RootState) => state.widgets);

  const [tabIndex, setTabIndex] = useState(0);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");
  const [tempWidgets, setTempWidgets] = useState(widgetsFromStore);
  const navigate = useNavigate();
  const categories = ["CSPM", "Image"];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    setTempWidgets(widgetsFromStore);
  }, []);

  const handleWidgetChange = (
    category: string,
    widgetId: string,
    selected: boolean
  ) => {
    setTempWidgets((prevWidgets) => ({
      ...prevWidgets,
      [category]: prevWidgets[category].map((widget) =>
        widget.id === widgetId ? { ...widget, selected } : widget
      ),
    }));
  };

  const handleAddWidget = () => {
    if (newWidgetName && newWidgetText) {
      const newWidget = {
        id: uuidv4(),
        name: newWidgetName,
        text: newWidgetText,
        selected: true,
      };
      setTempWidgets((prevWidgets) => ({
        ...prevWidgets,
        [categories[tabIndex]]: [
          ...prevWidgets[categories[tabIndex]],
          newWidget,
        ],
      }));
    }
  };

  const handleConfirm = () => {
    for (const category of categories) {
      for (const widget of tempWidgets[category]) {
        dispatch(
          updateWidget({
            category,
            id: widget.id,
            selected: widget.selected,
          })
        );
      }
    }

    if (newWidgetName && newWidgetText) {
      const newWidget = {
        id: uuidv4(),
        name: newWidgetName,
        text: newWidgetText,
        selected: true,
      };

      dispatch(
        addWidget({
          category: categories[tabIndex],
          widget: newWidget,
        })
      );
      navigate(0);
      setNewWidgetName("");
      setNewWidgetText("");
    }

    handleSidebar();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: showSidebar ? "0" : "-100%",
        zIndex: "10",
        background: "white",
        width: "50vw",
        height: "100%",
        transition: "right 0.4s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "blue",
          padding: "10px",
          "& svg": {
            color: "white",
            width: "100px",
            cursor: "pointer",
          },
        }}
      >
        <Typography sx={{ color: "white" }}>Add Widget</Typography>
        <RxCross2 onClick={handleSidebar} />
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        {categories.map((category, index) => (
          <Tab key={index} label={category} />
        ))}
      </Tabs>
      <Box p={2}>
        <CategoryTab
          widgets={tempWidgets[categories[tabIndex]] || []}
          onWidgetChange={(widgetId, selected) =>
            handleWidgetChange(categories[tabIndex], widgetId, selected)
          }
        />
      </Box>
      <Box p={2}>
        <TextField
          label="Widget Name"
          value={newWidgetName}
          onChange={(e) => setNewWidgetName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Widget Text"
          value={newWidgetText}
          onChange={(e) => setNewWidgetText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddWidget}>
          Add Widget
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button variant="outlined" onClick={handleSidebar}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
