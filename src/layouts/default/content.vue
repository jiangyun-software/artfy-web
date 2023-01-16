<template>
  <div style="padding-top: 72px">
    <RouterView>
      <template #default="{ Component, route }">
        <transition
          :name="
            getTransitionName({
              route,
              openCache,
              enableTransition: getEnableTransition,
              cacheTabs: [],
              def: getBasicTransition,
            })
          "
          mode="out-in"
          appear
        >
          <div :key="route.name?.toString()">
            <component :is="Component" :key="route.fullPath" />
          </div>
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';

  export default defineComponent({
    name: 'PageLayout',
    setup() {
      const { getShowMultipleTab } = useMultipleTabSetting();

      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();

      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCanEmbedIFramePage,
      };
    },
  });
</script>
