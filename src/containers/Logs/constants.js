import Cookies from 'js-cookie';

export const KEY_ACTION = 'action';
export const KEY_FORM = 'form';
export const KEY_FORMS = 'forms';
export const KEY_RESULT = 'result';
export const KEY_OFFSETS = 'offsets';
export const KEY_TIMESTAMP = 'timestamp';
export const KEY_ERROR = 'error';
export const ACTION_DEFAULT = 'ACTION_DEFAULT';
export const ACTION_VALIDATE_FORM = 'ACTION_VALIDATE_FORM';
export const ACTION_CREATE_FORM = 'ACTION_CREATE_FORM';
export const ACTION_RETRIEVE_FORM = 'ACTION_RETRIEVE_FORM';
export const ACTION_DELETE_FORM = 'ACTION_DELETE_FORM';
export const DEFAULT_FORM = {
  user_id: Cookies.get('user_id'),
  show_cols: [],
  remark: '',
  event_name: '',
  terms: [
    {
      left: '',
      op: '',
      right: ''
    }
  ]
};
