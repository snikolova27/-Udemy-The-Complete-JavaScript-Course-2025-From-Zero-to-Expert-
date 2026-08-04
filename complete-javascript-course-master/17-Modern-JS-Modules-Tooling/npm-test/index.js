import { cloneDeep } from "lodash-es";

const testObject = {
  name: "Soni",
  books: ["ACOTAR", "ACOWAR"],
  movies: [
    {
      name: "Movie 1",
      year: 3002,
    },
  ],
};

const objectDeepCopy = cloneDeep(testObject);
objectDeepCopy.name = "Soni 2";
console.log(objectDeepCopy);
console.log(testObject);


// For Parcel only, hot reload
if(module.hot){
  module.hot.accept()
}