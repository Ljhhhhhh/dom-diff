import {createElement, render, renderDom} from './element';
import diff from './diff';
import patch from "./patch";

let vertualDom = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c']),
])

let vertualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('li', {class: 'item'}, ['2']),
  createElement('div', {class: 'item'}, ['3']),
])

// console.log(patchs)
let el = render(vertualDom)
renderDom(el, window.root);

let patches = diff(vertualDom, vertualDom2);
console.log('patches:', patches);
patch(el, patches);