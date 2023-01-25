import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../utils/api';
import _ from 'lodash';

interface Story {
  id: number;
  by: string;
  title: string;
  url: string;
  score: number;
  authorKarma: number;
}

interface User {
  id: number;
  karma: number;
}

export interface StoriesState {
  data: Story[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string;
}

async function fetchStory(id: number): Promise<Story> {
  const response = await api.get(`/item/${id}.json`);
  const userId = response?.data?.by;
  if (!userId) {
    return Promise.reject('User ID not found');
  }
  const karmaScore = await fetchUserId(userId);
  return {...response.data, authorKarma: karmaScore?.karma};
}

async function fetchUserId(id: number): Promise<User> {
  const response = await api.get(`/user/${id}.json`);
  if (!response.data) {
    return Promise.reject('User data not found');
  }
  return response.data;
}

export const getStories = createAsyncThunk('stories/getStories', async () => {
  const response = await api.get('/topstories.json');
  const storyIds = response?.data;
  if (!storyIds) {
    return Promise.reject('Story IDs not found');
  }
  const rand10Stories = _.sampleSize(storyIds, 10);
  const stories = await Promise.all(
    rand10Stories.map((i: number) => fetchStory(i)),
  );
  return stories;
});

const initialState: StoriesState = {
  data: [],
  loading: 'idle',
  error: '',
};

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getStories.pending, state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(getStories.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        const sortByScore = _.orderBy(action?.payload, 'score', 'desc');
        state.data = sortByScore;
        state.loading = 'idle';
      }
    });
    builder.addCase(getStories.rejected, state => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = 'Error occured';
      }
    });
  },
});

export const selectAll = (state: {stories: StoriesState}) => {
  return state.stories;
};

export default storiesSlice.reducer;
