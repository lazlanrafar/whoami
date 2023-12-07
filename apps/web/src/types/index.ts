export type ISkill = {
  id?: string;
  title: string;
  year: number;
  level?: number;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type IProjectForm = {
  id?: string;
  thumbnail?: string;
  title: string;
  description: string;
  source_code?: string;
  url?: string;
  technology?: string[];
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
  technology?: IProjectTechnology[];
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
};

export type IProjectTechnology = {
  skill: ISkill;
};
