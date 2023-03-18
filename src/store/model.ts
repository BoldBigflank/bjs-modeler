import type { Shape } from '../Types'

import {
    action,
    Action,
    computed,
    Computed,
    thunk,
    Thunk,
    thunkOn,
    ThunkOn,
  } from 'easy-peasy';
  
  
  export interface ShapesModel {
    shapes: Shape[];
  
    completedShapes: Computed<this, Shape[]>;
    remainingShapes: Computed<this, Shape[]>;
  
    addShape: Action<this, Shape>;
    updateShape: Action<this, Shape>;
    removeShape: Action<this, Shape>;
  
    onShapesChanged: ThunkOn<this>;
    saveShapes: Thunk<this, Shape[]>;
  }
  
  const shapesStore: ShapesModel = {
    shapes: [],
  
    // completedShapes: computed((state) => state.shapes.filter((shape) => shape.done)),
    // remainingShapes: computed((state) => state.shapes.filter((shape) => !shape.done)),
  
    addShape: action((state, payload) => {
      state.shapes.push(payload);
    }),
    removeShape: action((state, payload) => {
        const updatedShapes = state.shapes.filter((shape) => shape.id !== payload.id)
        state.shapes = updatedShapes
    }),
    updateShape: action((state, newShape) => {
        const updatedShapes = state.shapes.map((shape) => {
            if (shape.id !== newShape.id) return shape
            return newShape
        })
        state.shapes = updatedShapes
    }),
  
    onShapesChanged: thunkOn(
      (actions) => [actions.addShape, actions.updateShape],
      (actions, payload, { getState }) => {
        console.log(`onShapesChanged triggered by `, payload);
        actions.saveShapes(getState().shapes);
      },
    ),
    saveShapes: thunk((actions, shapesToSave) => {
      console.log(`Imagine were sending ${shapesToSave.length} shapes to a remote server..`);
    }),
  };
  
  export default shapesStore;
  