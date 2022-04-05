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
  sending: boolean;

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
    id: string;
    key: string;
    value: string;
    enabled: boolean;
  }[];
  response?: Response;
};

export type Response =
  | { error: string }
  | {
      body: {
        raw: string;
      };
      time: number;
      sentAt: Date;
      status: number;
      headers: { [key: string]: string };
    };

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type AuthType = 'basic' | 'digest' | 'bearer' | 'api_key' | null;

export type Server = {};
