/** Stylesheets */
import 'bootstrap/dist/css/bootstrap.css';

/** Javascripts */
import Bind from './bind';
import Observer from './observer';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
window.observer = Observer();

window.kjs = {
  "$store": {},
  "$caches": {},
  "$state": {},
  setState(target){
    this.$state = Object.assign(this.$state, target);
  },
  init(view = "#app", model){
    this.$state = Bind($(view), model, observer);
    return this;
  }
};