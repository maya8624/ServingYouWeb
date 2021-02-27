import http from "./httpService";
import { localUrl, azApiUrl, awsApiUrl } from "../config.json";
import funcs from "../utils/funcs";
// import { v4 as uuidv4 } from "uuid";

const awsEndPoint = `${awsApiUrl}/members`;
const azEndPoint = `${azApiUrl}/members`;
//const localPoint = `${localUrl}/members`;

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

    const res1 = await http.post(azEndPoint, azFormat);
    let res2;

    if (res1.status === 201) {
      const res2 = http.post(awsEndPoint, member);
    }
    return res2;
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
