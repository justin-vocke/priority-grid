export const updateItem = (payload, items) => {
  var index = items.map(item => item._id).indexOf(payload._id);
  items[index].name = payload.name;
  items[index].quadrant = payload.quadrant;

  return items[index];
}