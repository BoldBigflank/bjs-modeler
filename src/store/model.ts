import type { AllShapes } from '../Types'

import {
    action,
    Action,
    thunk,
    Thunk,
    thunkOn,
    ThunkOn,
  } from 'easy-peasy';
  
  export interface ShapesModel {
    shapes: AllShapes[];
  
    addShape: Action<this, AllShapes>;
    updateShape: Action<this, AllShapes>;
    removeShape: Action<this, AllShapes>;
  
    onShapesChanged: ThunkOn<this>;
    saveShapes: Thunk<this, AllShapes[]>;
  }
  
  const shapesStore: ShapesModel = {
    shapes: [],
  
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
      console.log('updateShape')
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
  