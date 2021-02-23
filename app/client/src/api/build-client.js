import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://192-168-49-2.kubernetes.default.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseUrl: '/',
    });
  }
};
