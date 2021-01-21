import { TRAVELR_API } from '../config/keys';

const isAdmin = async (token, sub) => {
  // Api call to check if a given user is admin
  const response = await fetch(`${TRAVELR_API}/users/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  const json = await response.json();
  return json.data.role == 'admin' ? true : false;
}

export default isAdmin