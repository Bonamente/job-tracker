/* eslint-disable import/no-extraneous-dependencies */
import { useId } from 'react';
import { rest } from 'msw';

import { TEST_FETCHED_JOBS, TEST_FETCHED_STATS } from './test-data';

const delay = 50;
const baseURL = import.meta.env.VITE_BASE_URL;

const ALL_JOBS_ENDPOINT = `${baseURL}/jobs`;

const STATS_ENDPOINT = `${baseURL}/jobs/stats`;

const LOGIN_ENDPOINT = `${baseURL}/auth/login`;

const REGISTER_ENDPOINT = `${baseURL}/auth/register`;

const UPDATE_USER_ENDPOINT = `${baseURL}/auth/updateUser`;

const CREATE_JOB_ENDPOINT = `${baseURL}/jobs`;

const EDIT_JOB_ENDPOINT = `${baseURL}/jobs:jobId`;

const DELETE_JOB_ENDPOINT = `${baseURL}/jobs:jobId`;

const handlers = [
  rest.get(ALL_JOBS_ENDPOINT, (req, res, ctx) => {
    const status = req.url.searchParams.get('status');

    if (status) {
      return res(ctx.delay(delay), ctx.json(TEST_FETCHED_JOBS));
    }

    return res(ctx.delay(delay), ctx.json('THERE IS NO DATA'));
  }),

  rest.get(STATS_ENDPOINT, (_, res, ctx) => {
    return res(ctx.delay(delay), ctx.json(TEST_FETCHED_STATS));
  }),

  rest.post(LOGIN_ENDPOINT, async (req, res, ctx) => {
    const { email } = await req.json();

    return res(
      ctx.delay(delay),
      ctx.json({
        user: {
          email,
          name: 'registered user',
          lastName: '',
          location: '',
        },
      })
    );
  }),

  rest.post(REGISTER_ENDPOINT, async (req, res, ctx) => {
    const { name, email } = await req.json();

    return res(
      ctx.delay(delay),
      ctx.json({
        user: {
          email,
          name,
          lastName: '',
          location: '',
        },
      })
    );
  }),

  rest.patch(UPDATE_USER_ENDPOINT, async (req, res, ctx) => {
    const { email, name, lastName, location } = await req.json();

    return res(
      ctx.delay(delay),
      ctx.json({
        user: {
          email,
          name,
          lastName,
          location,
        },
      })
    );
  }),

  rest.post(CREATE_JOB_ENDPOINT, async (req, res, ctx) => {
    const { position, company, jobLocation, jobType, status } =
      await req.json();

    return res(
      ctx.delay(delay),
      ctx.json({
        _id: useId(),
        createdAt: Date.now(),
        company,
        jobLocation,
        jobType,
        position,
        status,
      })
    );
  }),

  rest.patch(EDIT_JOB_ENDPOINT, async (req, res, ctx) => {
    const { company, jobLocation, jobType, position, status } =
      await req.json();

    const { jobId } = req.params;

    return res(
      ctx.delay(delay),
      ctx.json({
        _id: jobId,
        createdAt: Date.now(),
        company,
        jobLocation,
        jobType,
        position,
        status,
      })
    );
  }),

  rest.delete(DELETE_JOB_ENDPOINT, async (req, res, ctx) => {
    const { jobId } = req.params;

    return res(ctx.delay(delay), ctx.json(`Job with ${jobId} deleted`));
  }),
];

export default handlers;
