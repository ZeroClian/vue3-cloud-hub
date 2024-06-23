import request from '@/utils/request'
import { updateJob, Job, addJob } from './type'

enum API {
  ALL_JOB = '/scheduler/jobs',
  ADD_JOB = '/scheduler/job/add',
  UPDATED_JOB = '/scheduler/job/update',
  DELETE_JOB = '/scheduler/job/delete',
  PAUSE_JOB = '/scheduler/job/pause',
  RESUME_JOB = '/scheduler/job/resume',
}

export const reqAllJob = () => request.get<any, any>(API.ALL_JOB)
export const reqAddJob = (data: addJob) =>
  request.post<any, any>(API.ADD_JOB, data)
export const reqUpdateJob = (data: updateJob) =>
  request.post<any, any>(API.UPDATED_JOB, data)
export const reqDeleteJob = (data: Job) =>
  request.post<any, any>(API.DELETE_JOB, data)
export const reqPauseJob = (data: Job) =>
  request.post<any, any>(API.PAUSE_JOB, data)
export const reqResumeJob = (data: Job) =>
  request.post<any, any>(API.RESUME_JOB, data)
