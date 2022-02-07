<template>
  <div>
    <img src="">
  </div>
</template>

<script lang="ts" setup>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import {ref} from "vue";

const defaultOptions = {
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true,
};

const cropper = ref(null);
const imgElRef = ref(null);

</script>