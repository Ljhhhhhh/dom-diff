function diff(oldTree, newTree) {
  let patches = {};
  let index = 0;
  walk(oldTree, newTree, index, patches);
  return patches;
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
function walk(oldNode, newNode, index ,patches) {
  let currentPatch = [];
  if (!newNode) {
    currentPatch.push({type: REMOVE, index})
  } else if (isString(oldNode) && isString(newNode)) {
     if (oldNode !== newNode) {
       currentPatch.push({
         type: TEXT,
         text: newNode
       })
     }
  } else if (oldNode.type === newNode.type) {
    let attrs = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({
        type: ATTRS,
        attrs
      })
    }
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    currentPatch.push({
      type: REPLACE,
      newNode
    })
  }
  if (currentPatch.length > 0) {
    patches[index] = currentPatch;
  }
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key];
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}

function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches)
  });
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}

export default diff;