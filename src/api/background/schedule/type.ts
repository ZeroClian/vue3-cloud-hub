export interface updateJob {
  jobName: string
  jobGroup: string
  cron: string
}

export interface addJob {
  jobName: string
  jobGroup: string
  cron: string
  jobClass: string
}

export interface Job {
  jobName: string
  jobGroup: string
}
