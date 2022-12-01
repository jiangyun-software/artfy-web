<template>
  <div class="content">
    <Menu />
    <div class="view-wrap">
      <div class="view">
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
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from '../default/transition';
  import Menu from './menu.vue';

  export default defineComponent({
    name: 'UserPageLayout',
    components: {
      Menu,
    },
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

<style lang="less" scoped>
  .content {
    padding-top: 100px;
    display: flex;

    .view-wrap {
      flex: 1;
      padding: 24px;

      .view {
        // background-color: white;
        // padding: 48px;
      }
    }
  }
</style>
