module.exports = {
  status: 0,
  values: [{
    id: 1,
    source: "ACCOUNT_LOGIN",
    dest: "ACCOUNT_LOGIN",
    terms: {
      "when": [
        {
          "src_col": "url_stem",
          "op": "contain",
          "op_string": "dispatch_post.do"
        },
        {
          "src_col": "payload",
          "op": "extract",
          "op_string": {
            "extract_type": "pram",
            "extract_context": "action",
            "extract_op": "equal",
            "extract_string": "submitLogin"
          }
        },
        {
          "src_col": "host",
          "op": "equal",
          "op_string": "www.duc365.com"
        },
        {
          "src_col": "status",
          "op": "morethan",
          "op_string": 400
        },
        {
          "src_col": "status",
          "op": "lessthan",
          "op_string": 500
        },
        {
          "src_col": "status",
          "op": "inrange",
          "op_string": [300, 500]
        }
      ],
      "then": [
        {
          "src_col": "url_stem",
          "tar_col": "url_stem",
          "op": "set"
        },
        {
          "src_col": "payload",
          "tar_col": "password",
          "op": "extract_set",
          "op_string": {
            "extract_type": "pram",
            "extract_context": "password",
            "extract_op": "self",
            "extract_string": ""
          }
        },
        {
          "src_col": "respond",
          "tar_col": "result",
          "op": "extract_set",
          "op_string": {
            "extract_type": "regex",
            "extract_context": "duc365.com/[?]?info",
            "extract_op": "switch",
            "extract_string": [
              {
                "op": "equal",
                "op_string": "user_account_center.html",
                "op_value": "T"
              },
              {
                "op": "contain",
                "op_string": "login.html",
                "op_value": "F"
              },
              {
                "op": "default",
                "op_value": "F"
              }

            ]
          }
        },
        {
          "src_col": "",
          "tar_col": "login_type",
          "op": "set",
          "op_string": "账号密码登录"
        },
        {
          "src_col": "respond",
          "tar_col": "result",
          "op": "extract_set",
          "op_string": {
            "extract_type": "json",
            "extract_context": "bindtype",
            "extract_op": "self"
          }
        }
      ]
    },
    host: "test.com",
    url: "/member/login.html",
    remark: "用户主站登陆请求",
    status: 1,
    last_modified: ""
  }, {
    id: 2,
    source: "ACCOUNT_REGISTRATION",
    dest: "ACCOUNT_REGISTRATION",
    terms: {
      "when": [
        {
          "src_col": "url_stem",
          "op": "contain",
          "op_string": "dispatch_post.do"
        },
        {
          "src_col": "payload",
          "op": "extract",
          "op_string": {
            "extract_type": "pram",
            "extract_context": "action",
            "extract_op": "equal",
            "extract_string": "submitLogin"
          }
        },
        {
          "src_col": "host",
          "op": "equal",
          "op_string": "www.duc365.com"
        },
        {
          "src_col": "status",
          "op": "morethan",
          "op_string": 400
        },
        {
          "src_col": "status",
          "op": "lessthan",
          "op_string": 500
        },
        {
          "src_col": "status",
          "op": "inrange",
          "op_string": [300, 500]
        }
      ],
      "then": [
        {
          "src_col": "url_stem",
          "tar_col": "url_stem",
          "op": "set"
        },
        {
          "src_col": "payload",
          "tar_col": "password",
          "op": "extract_set",
          "op_string": {
            "extract_type": "pram",
            "extract_context": "password",
            "extract_op": "self",
            "extract_string": ""
          }
        },
        {
          "src_col": "respond",
          "tar_col": "result",
          "op": "extract_set",
          "op_string": {
            "extract_type": "regex",
            "extract_context": "duc365.com/[?]?info",
            "extract_op": "switch",
            "extract_string": [
              {
                "op": "equal",
                "op_string": "user_account_center.html",
                "op_value": "T"
              },
              {
                "op": "contain",
                "op_string": "login.html",
                "op_value": "F"
              },
              {
                "op": "default",
                "op_value": "F"
              }

            ]
          }
        },
        {
          "src_col": "",
          "tar_col": "login_type",
          "op": "set",
          "op_string": "账号密码登录"
        },
        {
          "src_col": "respond",
          "tar_col": "result",
          "op": "extract_set",
          "op_string": {
            "extract_type": "json",
            "extract_context": "data.bindtype",
            "extract_op": "self"
          }
        }, {
          'src_col': '',
          'op': 'switch',
          'tar_col': 'result',
          'op_string': [
            {
              'src_col': '',
              "op": "and",
              "op_string": [
                {'op': 'equal', 'src_col': 'status', 'op_string': '302'},
                {'op': 'contain', 'src_col': 's_body', 'op_string': 'error'}],
              "op_value": "T"
            },
            {
              'src_col': '',
              "op": "and",
              "op_string": [
                {'op': 'equal', 'src_col': 'status', 'op_string': '200'},
                {
                  'op': 'extract',
                  'src_col': 's_body',
                  'op_string': {
                    "extract_type": "json",
                    "extract_context": "bindtype",
                    "extract_op": "contain",
                    "extract_string": "123"
                  }
                }],
              "op_value": "T"
            },
            {
              'op': 'default',
              'op_value': "F"
            }
          ]
        }
      ]
    },
    host: "test.com",
    url: "/member/register.html",
    remark: "用户主站注册请求",
    status: 1,
    last_modified: ""
  }],
  total: 20
};
