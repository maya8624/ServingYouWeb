import http from "./httpService";
import { azApiUrl, awsApiUrl } from "../config.json";
import funcs from "../utils/funcs";

const awsEndPoint = `${awsApiUrl}/members`;
const azEndPoint = `${azApiUrl}/members`;

export async function register(member) {
  try {
    // create an hasedPassword
    member.password = funcs.hashPassword(member.password);

    const azFormat = {
      firstname: member.firstName,
      lastname: member.lastName,
      phone: member.mobile,
      email: member.email,
    };

    const azResponse = await http.post(azEndPoint, azFormat);
    let awsResponse;

    if (azResponse.status === 201) {
      awsResponse = await http.post(awsEndPoint, member);
    }
    return awsResponse;
  } catch (error) {
    console.log("Unable to create a member", error);
  }
}

export async function getMember(id) {
  const { data } = await http.get(`${awsApiUrl}/member/${id}`);
  return data;
}

const memberService = {
  getMember,
  register,
};

export default memberService;
