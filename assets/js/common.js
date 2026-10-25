'use strict';

function $(id) {
  return document.getElementById(id);
}

function fa(value) {
  return Number(value).toLocaleString('fa-IR', {
    maximumFractionDigits: 8
  });
}
