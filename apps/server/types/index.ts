export type ISkill = {
  id?: string;
  title: string;
  year: number;
  level?: number;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
};

export type IProject = {
  id?: string;
  thumbnail?: string;
  title: string;
  description: string;
  source_code?: string;
  url?: string;
  technology?: IProjectTechnology[] | string[];
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
};

export type IProjectTechnology = {
  id?: string;
  project_id: string;
  skill_id: string;
  created_at?: Date;
  updated_at?: Date;
};

// =============================================== API

export type IApiParams = {
  created_by?: string;
  search?: string;
  page?: number;
  limit?: number;
};
