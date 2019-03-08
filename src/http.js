// import fetch from 'isomorphic-fetch';
// import _ from 'lodash';
// import URI from 'urijs';
// import {
//   externalConfig
// } from 'app.config';
// // import {hashHistory} from 'react-router';

// const GET = 'GET';
// const POST = 'POST';
// const PUT = 'PUT';
// const DELETE = 'DELETE';


// // var form = document.querySelector('form');
// //
// // fetch('/users', {
// //     method: 'POST',
// //     body: new FormData(form)
// // });

// // let form = (function () {
// //     return function (url, form) {
// //         fetch('/users', {
// //             method: 'POST',
// //             body: new FormData(form)
// //         });
// //     }
// // })();

// function reducer(promise) {
//   return promise
//     .then((response) => {
//       if (response.status === 200 &&
//         /\/user$/.test(response.url)) {
//         location.href = '/';
//         return location.href;
//       }

//       if (response.status !== 200) {
//         throw new Error(response.status);
//       }

//       return response.json();
//     })
//     .then(response => response);
// }

// function action(method) {
//   return (url, data, external) => {
//     if (method === GET) {
//       const uri = URI(url).query(data);
//       let options = {};
//       // 如果跨域且headers是标准头，那么按照正常的请求发送
//       if (external || externalConfig) {
//         options = {
//           mode: 'cors',
//           cache: 'default'
//         };
//       } else {
//         options = {
//           mode: 'cors',
//           cache: 'default',
//           credentials: 'include',
//           headers: {
//             'Access-Control-Allow-Origin': '*'
//           }
//         };
//       }

//       return reducer(fetch(uri, options));
//     }

//     const promise = fetch(url, {
//       method,
//       credentials: external || externalConfig ? '' : 'include',
//       cache: 'default',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     return reducer(promise);
//   };
// }

// const http = _.reduce(
//   [GET, POST, PUT, DELETE],
//   (result, method) => {
//     const resultTemp = result;
//     resultTemp[method.toLowerCase()] = action(method);
//     return resultTemp;
//   },
//   {}
// );

// export default http;

import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import URI from 'urijs';
import {
  externalConfig
} from 'app.config';
// import {hashHistory} from 'react-router';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
console.log( fetch )
function reducer(promise) {
  return promise
    .then((response) => {
      if (response.status === 200 &&
        /\/user$/.test(response.url)) {
        location.href = '/';
        return location.href;
      }

      if (response.status !== 200) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(response => response);
}

function action(method) {
  return (url, data, external) => {
    if (method === GET) {
      const uri = URI(url).query(data);
      let options = {};
      // 如果跨域且headers是标准头，那么按照正常的请求发送
      if (external || externalConfig) {
        options = {
          mode: 'cors',
          cache: 'default'
        };
      } else {
        options = {
          mode: 'cors',
          cache: 'default',
          credentials: 'include',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        };
      }

      return reducer(fetch(uri, options));
    }

    const promise = fetch(url, {
      method,
      mode: 'cors',
      credentials: external || externalConfig ? '' : 'include',
      cache: 'default',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return reducer(promise);
  };
}

const http = _.reduce(
  [GET, POST, PUT, DELETE],
  (result, method) => {
    const resultTemp = result;
    resultTemp[method.toLowerCase()] = action(method);
    return resultTemp;
  },
  {}
);

export default http;
