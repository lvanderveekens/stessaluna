export const renameProp = (oldProp, newProp, entity) => {
  entity[newProp] = entity[oldProp]
  delete entity[oldProp]
};