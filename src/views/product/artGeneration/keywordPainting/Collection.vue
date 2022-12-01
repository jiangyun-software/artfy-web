<template>
  <div class="content">
    <div>
      <router-link to="/product/keywordPainting">
        <div class="back">
          <img :src="tryIcon" alt="" />
          <span>返回关键词 生成画作</span>
        </div>
      </router-link>
    </div>
    <div class="user">
      <div class="user-icon"><img :src="userIcon" alt="" /></div>
      <div class="user-phone">{{ userInfo.phonenumber }}</div>
    </div>
    <div v-if="page.total == 0" class="no-data">暂无数据...</div>
    <div class="history">
      <div v-for="item in history" :key="item.id" class="history-item">
        <div class="history-image"><img :src="item.image" alt="" /></div>
        <div>
          <div class="history-option history-option-delete" @click="handleDelete(item.id)"><DeleteOutlined class="history-option-icon" /></div>
          <div class="history-option history-option-download" @click="handleDownload(item.image)"><DownloadOutlined class="history-option-icon" /></div>
        </div>
        <div class="history-keyword" :title="item.keyword">{{ item.keyword }}</div>
      </div>
    </div>
    <div class="page"><Pagination v-model:current="page.current" v-model:pageSize="page.pageSize" :total="page.total" :responsive="true" /></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import deleteIcon from '/@/assets/svg/delete.svg';
  import downloadIcon from '/@/assets/svg/download.svg';
  import tryIcon from '/@/assets/svg/gototry.svg';
  import userIcon from '/@/assets/svg/user.svg';
  import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons-vue';
  import { Pagination } from 'ant-design-vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'Collection',
    components: { DeleteOutlined, DownloadOutlined, Pagination },
    setup() {
      const userStore = useUserStore();
      const userInfo = computed(() => userStore.getUserInfo);

      const page = reactive({
        current: 0,
        pageSize: 10,
        total: 100,
      });

      const history = reactive([
        { id: 1, keyword: 'keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 2, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 3, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 4, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 5, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 6, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 7, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 8, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 9, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 10, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 11, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 12, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 13, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 14, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 15, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 16, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 17, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 18, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 19, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 20, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 21, keyword: 'keyword', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
      ]);

      const handleDelete = (id) => {
        history.splice(history.map((item) => item.id).indexOf(id), 1);
      };

      const handleDownload = (image) => {
        axios.get(image, { responseType: 'blob' }).then((result) => {
          let blob = new Blob([result.data]);
          let url = window.URL.createObjectURL(blob); // 创建 url 并指向 blob
          let a = document.createElement('a');
          a.href = url;
          a.download = url.substring(url.lastIndexOf('/'));
          a.click();
          window.URL.revokeObjectURL(url); // 释放该 url
        });
      };

      return {
        history,
        deleteIcon,
        tryIcon,
        userIcon,
        downloadIcon,
        userInfo,
        handleDelete,
        handleDownload,
        page,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    padding: 0px 100px 100px 100px;
    .back {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      margin-top: 60px;
      display: inline-block;

      img {
        transform: rotate(180deg);
        display: inline-block;
        width: 18px;
        height: 10px;
        margin-right: 8px;
      }
    }

    .user {
      text-align: center;

      .user-icon {
        display: inline-block;

        img {
          width: 100px;
          height: 100px;
        }
      }

      .user-phone {
        font-family: 'OPPOSans';
        font-style: normal;
        font-weight: 400;
        font-size: 48px;
        line-height: 63px;
        color: #000000;
      }
    }

    .no-data {
      text-align: center;
      margin-top: 60px;
    }

    .history {
      margin-top: 60px;
      display: flex;
      flex-wrap: wrap;

      .history-item {
        width: 260px;
        height: 260px;
        margin: 32px;
        position: relative;

        .history-image {
          background: #e9e9e9;
          border-radius: 8px;
          width: 100%;
          height: 100%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .history-option {
          width: 32px;
          height: 32px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 2px;
          display: none;
          cursor: pointer;
        }

        .history-option-delete {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .history-option-download {
          position: absolute;
          top: 216px;
          right: 12px;
        }

        .history-option-delete,
        .history-option-download {
          text-align: center;
          line-height: 28px;
        }

        .history-option-icon {
          font-size: 20px;
          vertical-align: middle !important;
          color: white;
        }

        .history-keyword {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          margin-top: 16px;

          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .history-item:hover .history-option {
        display: inline-block;
      }
    }
  }

  .page {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
</style>
