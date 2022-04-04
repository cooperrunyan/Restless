export type Storage = {
  currentWorkspace: string | null;
  workspaces: Workspace[];
  settings: {
    hideSidebar: boolean;
  };
};

export type Workspace = {
  currentCollection?: string;
  collections: Collection[];
  servers: Server[];
  name: string;
  id: string;
};

export type Collection = {
  name: string;
  id: string; // uuid
  currentRequest?: string;
  children: (Request | Folder)[];
};

export type Folder = {
  name: string;
  id: string;
  children: (Request | Folder)[];
};

export type Request = {
  name: string;
  id: string;
  endpoint: string;
  method: Method;
  body: {
    type: 'json' | 'text' | 'yaml' | null;
    data: string | null;
  };
  headers: {
    id: string;
    key: string;
    value: string;
    enabled: boolean;
  }[];
  docs: string; // Markdown
  auth: {
    type: AuthType;
    data: any;
  };
  query: {
    [key: string]: {
      content: string;
      enabled: boolean;
    };
  };
  response?: Response;
};

export type Response = {
  body: {
    raw: string;
    json: string;
  };
  headers: { [key: string]: string };
};

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type AuthType = 'basic' | 'digest' | 'bearer' | 'oauth2' | 'api_key' | null;

export type Server = {};
