<template>
  <PageWrapper :title="$route.meta.title">
    <Tinymce v-model="richContent"></Tinymce>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {PageWrapper} from '~/components/Page';
import {Tinymce} from "~/components/Tinymce";
import {richContent} from "./data";
</script>