import { customers } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { idCheck, stringCheck, stringArrCheck, webCheck } from "./helper.js";
// // This data file should export all functions using the ES6 standard as shown in the lecture code

let create = async (data) => {
  let newCustomer = {
    userName: data.userName,
    mailid: data.email,
    password: data.password,
  };

  const customer = await customers();
  const find = await customer.find({ userName: data.userName }).toArray();
  console.log(find, "find in user register customer data file");
  const insertInfo = await customer.insertOne(newCustomer);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add a band";
  const newId = insertInfo.insertedId.toString();
  return get(newId);
};
let get = async (id) => {
  if (stringCheck(id)) throw "invalid id";
  if (!ObjectId.isValid(id)) throw "the input string is not a valid id";

  const customerI = await customers();
  const customer = await customerI.findOne({ _id: new ObjectId(id) });
  if (customer === null) throw "No band with that id";
  customer._id = customer._id.toString();
  return customer;
};
let getByEmail = async (email) => {
  const customerI = await customers();
  const customer = await customerI.findOne({ mailid: email });
  if (customer === null) throw "No band with that id";
  customer._id = customer._id.toString();
  return customer;
};
let getAll = async () => {
  const band = await bands();
  let bandslist = await band.find({}).project({ _id: 1, name: 1 }).toArray();
  if (!bandslist) throw "Could not get all bands";
  bandslist = bandslist.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return bandslist;
};
let remove = async (id) => {
  if (stringCheck(id)) throw "invalid id";
  if (!ObjectId.isValid(id)) throw "the input string is not a valid id";

  const bandlist = await bands();
  const deletionInfo = await bandlist.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (deletionInfo.lastErrorObject.n === 0) {
    throw `Could not delete band with id of ${id}`;
  }

  return id;
};
const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  if (stringCheck(id)) throw "invalid id";
  if (!ObjectId.isValid(id)) throw "the input string is not a valid id";

  if (stringCheck(name)) throw "invalid name";
  // if(stringCheck(genre)) throw "invalid genre"
  if (stringArrCheck(genre)) throw "invalid genre";
  if (webCheck(website)) throw "invalid website";
  if (stringCheck(recordCompany)) throw "invalid recordCompany";
  if (stringArrCheck(groupMembers)) throw "invalid group members";
  if (!yearBandWasFormed) throw "the year band formed was not provided";
  if (typeof yearBandWasFormed != "number")
    throw "the input year band was formed is not a number";
  if (!(yearBandWasFormed >= 1900 && yearBandWasFormed <= 2023))
    throw "the input year is not in a correct range";

  const updated = {
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
  };
  const band = await bands();
  const updatedInfo = await band.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updated },
    { returnDocument: "after" }
  );
  // console.log(updatedInfo)
  if (updatedInfo.lastErrorObject.n === 0) {
    throw "could not update the band details";
  }
  updatedInfo.value._id = updatedInfo.value._id.toString();
  return updatedInfo.value;
};

export { remove, getAll, get, create, update, getByEmail };
