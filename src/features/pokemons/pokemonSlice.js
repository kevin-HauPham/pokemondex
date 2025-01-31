import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const getPokemons = createAsyncThunk(
  "pokemons/getPokemons",
  async ({ page, search, type, limit }, { rejectWithValue }) => {
    try {
      let url = `/api/pokemons`;
      // if (page) url += `?page=${page}`;
      // if (limit) url += `&limit=${limit}`;
      // if (search) url += `&search=${search}`;
      // if (type) url += `&type=${type}`;
      const response = await apiService.get(url, {
        params: {
          page: !page && 0,
          limit: !limit && 10,
          search,
          type
      }});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPokemonById = createAsyncThunk(
  "pokemons/getPokemonById",
  async (id, { rejectWithValue }) => {
    try {
      let url = `/api/pokemons/${id}`;
      const response = await apiService.get(url);
      if (!response.response.data)
        return rejectWithValue({ message: "No data" });
      return response.response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPokemon = createAsyncThunk(
  "pokemons/addPokemon",
  async ({ id, name, types, imgUrl }, { rejectWithValue }) => {
    try {
      let url = "/api/pokemons";
      console.log(url);
      await apiService.post(url, {
        id,
        name,
        types,
        url: imgUrl,
      });
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPokemon = createAsyncThunk(
  "pokemons/editPokemon",
  async ({ name, id, url, types }, { rejectWithValue }) => {
    try {
      let url = `/pokemons/${id}`;
      await apiService.put(url, { name, url, types });
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePokemon = createAsyncThunk(
  "pokemons/deletePokemon",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      let url = `/pokemons/${id}`;
      await apiService.delete(url);
      dispatch(getPokemonById());
      return;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    pokemons: [],
    pokemon: {
      pokemon: null,
      nextPokemon: null,
      previousPokemon: null,
    },
    search: "",
    isSearching: false,
    types: "",
    page: 1,
  },
  reducers: {
    changePage: (state, action) => {
      if (action.payload) {
        state.page = action.payload;
      } else {
        state.page++;
      }
    },
    typeQuery: (state, action) => {
      state.type = action.payload;
    },
    searchQuery: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [getPokemons.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },

    [getPokemonById.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },

    [addPokemon.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [deletePokemon.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [editPokemon.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [getPokemons.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { search, type } = state;
      if ((search || type) && state.page === 1) {
        state.pokemons = action.payload;
      } else {
        state.pokemons = [...state.pokemons, ...action.payload];
      }
    },

    [getPokemonById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pokemon = action.payload;
    },
    [addPokemon.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deletePokemon.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [editPokemon.fulfilled]: (state) => {
      state.isLoading = true;
    },
    [getPokemons.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },

    [getPokemonById.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },

    [addPokemon.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [deletePokemon.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [editPokemon.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
  },
});

const { actions, reducer } = pokemonSlice;
export const { changePage, searchQuery, typeQuery } = actions;
export default reducer;
