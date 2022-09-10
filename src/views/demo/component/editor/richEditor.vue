<template>
  <page-wrapper :title="$route?.meta?.title">
    <Tinymce v-model="richContent"></Tinymce>
  </page-wrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page';
import {Tinymce} from "~/components/Tinymce";
import {richContent} from "./data";
</script>