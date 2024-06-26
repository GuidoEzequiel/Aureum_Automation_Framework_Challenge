// Function to visit a DOM element and all of its descendants.
async function visitDirectChildren(element, callback) {
  // Apply the callback to the current element.
  await callback(element);

  // Get only children of the current element.
  const children = await element.$$(':scope > *');

  // Loop through each child and recursively call visitDirectChildren with both child and callback.
  for (const child of children) {
      await callback(child); // Include the callback here
  }
}

module.exports = visitDirectChildren;