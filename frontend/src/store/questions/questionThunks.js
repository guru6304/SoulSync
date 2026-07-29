import { createAsyncThunk } from "@reduxjs/toolkit";

import questionService from "../../services/question.service";
import answerService from "../../services/answer.service";

export const fetchQuestions =
createAsyncThunk(

    "questions/fetchQuestions",

    async (_, thunkAPI) => {

        try {

            return await questionService
                .getQuestions();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Unable to load questions."

            );

        }

    }

);
export const fetchDailySoulCard = createAsyncThunk(

    "questions/fetchDailySoulCard",

    async (moodType, thunkAPI) => {

        try {

            return await questionService.getDailySoulCard(
                moodType
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Unable to load today's Soul Card."

            );

        }

    }

);

export const answerQuestion = createAsyncThunk(
    "questions/answerQuestion",

    async ({ questionId, content, media = null }, thunkAPI) => {
        try {
            const response =
                await answerService.answerQuestion(
                    questionId,
                    content,
                    media
                );

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to submit answer."
            );
        }
    }
);

export const updateAnswer = createAsyncThunk(
    "questions/updateAnswer",

    async ({ answerId, content }, thunkAPI) => {
        try {
            const response =
                await answerService.updateAnswer(
                    answerId,
                    content
                );

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update answer."
            );
        }
    }
);

export const getMyAnswer = createAsyncThunk(
    "questions/getMyAnswer",

    async (questionId, thunkAPI) => {
        try {
            const response =
                await answerService.getMyAnswer(
                    questionId
                );

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch answer."
            );
        }
    }
);

export const deleteAnswer = createAsyncThunk(
    "questions/deleteAnswer",

    async (answerId, thunkAPI) => {
        try {
            await answerService.deleteAnswer(
                answerId
            );

            return answerId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete answer."
            );
        }
    }
);