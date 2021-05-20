# React Movie Battle App

> React Movie App v1.0 build without useContext or Redux (I know, its been crazy believe me)

## Table of contents

- [General info](#general-info)
- [Next](#next)
- [Setup](#setup)
- [Code Examples](#code-examples)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

## General info

Following my training I decided to create an app that I could add everything I know about React, I decided to not use Redux because I didn't wanted to be the "Redux for all guy" and it has been a great mistake

## Next

This has been very tougth, keep in mind that I only wanted to use useState because I wanted to do it without tools that simplified the code of the app, because it felt like "cheating", tools like Redux or useContext.

And you know what? worst decision ever, it's been a mess.

Now I'm working on V2.0 which will use Redux and refactoring this version to use useContext

## Code Examples

```
export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addedTodo: (state, action) => {
      state.push({
        id: uuid(),
        author: action.payload.name || 'anonymous',
        description: action.payload.description,
        completed: false,
        public: action.payload.public || false,
      });
    },
    toggledCompleted: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state[index].completed = !state[index].completed;
    },
    toggledEditing: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state[index].editing = !state[index].editing;
    },
    toggledPublic: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state[index].public = !state[index].public;
    },
    editedTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);

      state[index].description = action.payload.description;
    },
    deletedTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state.splice(index, 1);
    },
  },
});
```

## Features

The project is created with:

- Hooks.
- Custom Hooks (useLocalStorage and useInputForm).
- Redux with a modern approach using Redux Toolkit.
- Material UI
- React Router
- Ducks pattern
- Logical convention names, AKA past tense in redux actions, because when an anction has been dispatched it means that it has already happened, so its doesn't make sense to name it ADD or DELETE, it should be ADDED, or DELETED or even better todo/addedTodo or todo/removedTodo

## Setup

### `npm install & npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Status

Finished, but, hopping to add more features like login, logout and register using node/express and mongodb/mongoose

## Contact

Created by Cudi - feel free to contact me!
