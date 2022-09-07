// Init
import axios from 'axios';
import { toast } from 'react-toastify';

const api = async (method = 'get', uri, body) => {
  // API Call
  const url = process.env.REACT_APP_SERVER_URL + uri;

  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return new Promise((resolve, reject) => {
    axios[method](url, body)
      .then((res) => {
        if (res.data.success) {
          resolve(res);
        } else {
          console.log('API Error --------> ', res);
          console.log(res?.data?.errorMessage.length, 'jd');
          const errors = Object.values(res?.data?.errors ?? {});
          const error =
            errors?.[0]?.[0]?.length > 0
              ? errors?.[0]?.[0]
              : res?.data?.errorMessage.length == 1
              ? res?.data?.errorMessage[0]
              : 'Something bad happened';
          //const error = errors?.[0]?.[0]?.length > 0 ? errors?.[0]?.[0] : "Something bad happened";
          toast.error(error);
          reject(res);
        }
      })
      .catch((err) => {
        console.log('API Error CATCH ->', err);
        toast.error('Something went wrong.');
        reject(err);
      });
  });
};

// Export
export default api;
