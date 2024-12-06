import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PERMISSIONS, request, check } from 'react-native-permissions';
import { Platform } from 'react-native';

// 갤러리 권한 요청 비동기 작업
export const requestGalleryPermission = createAsyncThunk(
    'permissions/requestGalleryPermission',
    async () => {
        const permission =
            Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

        const status = await check(permission);
        if (status === 'granted') {
            return 'granted';
        }

        const result = await request(permission);
        return result;
    }
);

const permissionSlice = createSlice({
    name: 'permissions',
    initialState: {
        galleryPermission: 'unavailable', // 'granted', 'denied', 'unavailable'
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestGalleryPermission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestGalleryPermission.fulfilled, (state, action) => {
                state.loading = false;
                state.galleryPermission = action.payload;
            })
            .addCase(requestGalleryPermission.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default permissionSlice.reducer;
