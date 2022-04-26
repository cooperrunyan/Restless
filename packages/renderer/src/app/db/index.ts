import * as create from './create';
import * as del from './delete';
import * as get from './get';
import * as modify from './modify';
import * as set from './set';

export const db = { create, delete: del, get, modify, set };
